// --------------------------------------------------------
// Title:       网络底层
// Author:      csh
// LastDate:    2018.02.10
// LastContent: 网络底层
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
if (!ArrayBuffer.transfer) {
    ArrayBuffer.transfer = function (source, length) {
        source = Object(source);
        var dest = new ArrayBuffer(length);
        if (!(source instanceof ArrayBuffer) || !(dest instanceof ArrayBuffer)) {
            throw new TypeError("Source and destination must be ArrayBuffer instances");
        }
        if (dest.byteLength >= source.byteLength) {
            var nextOffset = 0;
            var leftBytes = source.byteLength;
            var wordSizes = [8, 4, 2, 1];
            wordSizes.forEach(function (_wordSize_) {
                if (leftBytes >= _wordSize_) {
                    var done = transferWith(_wordSize_, source, dest, nextOffset, leftBytes);
                    nextOffset = done.nextOffset;
                    leftBytes = done.leftBytes;
                }
            });
        }
        return dest;
        function transferWith(wordSize, source, dest, nextOffset, leftBytes) {
            var ViewClass = Uint8Array;
            switch (wordSize) {
                case 8:
                    ViewClass = Float64Array;
                    break;
                case 4:
                    ViewClass = Float32Array;
                    break;
                case 2:
                    ViewClass = Uint16Array;
                    break;
                case 1:
                    ViewClass = Uint8Array;
                    break;
                default:
                    ViewClass = Uint8Array;
                    break;
            }
            var view_source = new ViewClass(source, nextOffset, Math.trunc(leftBytes / wordSize));
            var view_dest = new ViewClass(dest, nextOffset, Math.trunc(leftBytes / wordSize));
            for (var i = 0; i < view_dest.length; i++) {
                view_dest[i] = view_source[i];
            }
            return {
                nextOffset: view_source.byteOffset + view_source.byteLength,
                leftBytes: source.byteLength - (view_source.byteOffset + view_source.byteLength)
            }
        }
    };
}

function bytestream(size_or_buffer) {
    if (size_or_buffer instanceof ArrayBuffer) {
        this.buffer = size_or_buffer;
    } else {
        this.buffer = new ArrayBuffer(size_or_buffer);
    }

    this.rpos_ = 0;
    this.wpos_ = 0;
    this.view = new DataView(this.buffer);

    /////////////////
    this.readInt8 = function () {
        return this.view.getInt8(this.rpos_++);
    }

    this.readInt16 = function () {
        let v = this.view.getInt16(this.rpos_, true);
        this.rpos_ += 2;
        return v;
    }

    this.readInt32 = function () {
        let v = this.view.getInt32(this.rpos_, true);
        this.rpos_ += 4;
        return v;
    }

    this.readString = function () {
        let length = this.readInt32();
        if (length == 0) {
            return '';
        }
        cc.log('redstr ' + length + ' ' + this.rpos_ + ' ' + this.buffer.byteLength);
        let buf = new Uint8Array(this.buffer, this.rpos_, length);
        this.rpos_ += buf.length;
        return this.utf8ArrayToString(buf);
    }

    this.utf8ArrayToString = function (array) {
        let out, i, len, c;
        let char2, char3;

        out = "";
        len = array.length;
        i = 0;

        while (i < len) {
            c = array[i++];

            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }
    ////////////////////////
    this.writeInt8 = function (v) {
        this.ensure_wspace(1);
        this.view.setInt8(this.wpos_, v);
        this.wpos_ += 1;
    }

    this.writeInt16 = function (v) {
        this.ensure_wspace(2);
        this.view.setInt16(this.wpos_, v, true);
        this.wpos_ += 2;
    }

    this.writeInt32 = function (v) {
        this.ensure_wspace(4);
        this.view.setInt32(this.wpos_, v, true);
        this.wpos_ += 4;
    }

    this.writeString = function (v) {
        let u8 = this.stringToUTF8Bytes(v);
        this.ensure_wspace(u8.length + 4);
        this.writeInt32(u8.length);
        let buf = new Uint8Array(this.buffer, this.wpos_);
        for (let i = 0; i < u8.length; ++i) {
            buf[i] = u8[i];
        }

        this.wpos_ += u8.length;
    }

    this.stringToUTF8Bytes = function (str) {
        let utf8 = [];
        for (let i = 0; i < str.length; i++) {
            let charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6),
                    0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (str.charCodeAt(i) & 0x3ff))
                utf8.push(0xf0 | (charcode >> 18),
                    0x80 | ((charcode >> 12) & 0x3f),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }

    this.wpos = function () {
        return this.wpos_;
    }

    this.rpos = function () {
        return this.rpos_;
    }

    this.bytes = function () {
        return this.buffer.slice(this.rpos_, this.wpos_);
    }

    this.ensure_wspace = function (size) {
        if ((this.wpos_ + size) >= this.buffer.byteLength) { //空间满了
            let tmp = ArrayBuffer.transfer(this.buffer, this.buffer.byteLength + size);
            this.buffer = tmp;
            this.view = new DataView(this.buffer);
        }
    }
}

module.exports = bytestream;