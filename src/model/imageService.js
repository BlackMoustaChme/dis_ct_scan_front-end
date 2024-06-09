import * as nifti from 'nifti-reader-js'
export const imageService = {

    drawCanvas(canvas, slice, niftiHeader, niftiImage) {
        // canvas - is sent here by view 
        // slice - can be obtained through .getState()
        // niftiHeader - can be obtained through .getState() ?? or that value is constant
        // niftiImage - can be obtained through .getState() ?? or that value is constant
        // get nifti dimensions
        // console.log(canvas)
        var cols = niftiHeader.dims[1];
        var rows = niftiHeader.dims[2];

        // set canvas dimensions to nifti slice dimensions
        canvas.width = cols;
        canvas.height = rows;

        // make canvas image data
        var ctx = canvas.getContext("2d");
        var canvasImageData = ctx.createImageData(canvas.width, canvas.height);
        // console.log(niftiImage)
        // convert raw data to typed array based on nifti datatype

        console.log("Mask False")
        // console.log(typedData)

        // offset to specified slice
        var sliceSize = cols * rows;
        var sliceOffset = sliceSize * slice;

        // draw pixels
        for (var row = 0; row < rows; row++) {
            var rowOffset = row * cols;

            for (var col = 0; col < cols; col++) {
                var offset = sliceOffset + rowOffset + col;
                // var value = typedData[offset];
                var value = niftiImage[offset];
                // console.log("cycle", offset, value)

                /* 
                   Assumes data is 8-bit, otherwise you would need to first convert 
                   to 0-255 range based on datatype range, data range (iterate through
                   data to find), or display range (cal_min/max).
                   
                   Other things to take into consideration:
                     - data scale: scl_slope and scl_inter, apply to raw value before 
                       applying display range
                     - orientation: displays in raw orientation, see nifti orientation 
                       info for how to orient data
                     - assumes voxel shape (pixDims) is isometric, if not, you'll need 
                       to apply transform to the canvas
                     - byte order: see littleEndian flag
                */
            //    console.log(value & 0xFF)
                canvasImageData.data[(rowOffset + col) * 4] = value ;
                canvasImageData.data[(rowOffset + col) * 4 + 1] = value ;
                canvasImageData.data[(rowOffset + col) * 4 + 2] = value ;
                canvasImageData.data[(rowOffset + col) * 4 + 3] = 0xFF;

            }
        }
        console.log("canvasImageData", canvasImageData)
        console.log("canvasImageData.data",canvasImageData.data)
        ctx.putImageData(canvasImageData, 0, 0);
        return canvasImageData
    },

    drawMaskedCanvas(canvas, slice, niftiHeader, niftiImage, masksData) {
              // canvas - is sent here by view 
        // slice - can be obtained through .getState()
        // niftiHeader - can be obtained through .getState() ?? or that value is constant
        // niftiImage - can be obtained through .getState() ?? or that value is constant
        // get nifti dimensions
        // console.log(canvas)
        var cols = niftiHeader.dims[1];
        var rows = niftiHeader.dims[2];

        // set canvas dimensions to nifti slice dimensions
        canvas.width = cols;
        canvas.height = rows;

        // make canvas image data
        var ctx = canvas.getContext("2d");
        var canvasImageData = ctx.createImageData(canvas.width, canvas.height);
        // console.log(niftiImage)
        // convert raw data to typed array based on nifti datatype
        let maskFlag = false
        let maskData = null
        let slice_int = parseInt(slice)
        // console.log("Mask True")
        console.log(masksData[0].slice_idx, slice)
        for (var i = 0; i < 20; i++) {
          // console.log(masksData[i].data, masksData[i].slice_idx)
          if (slice_int === masksData[i].slice_idx) {
            console.log("Mask True")
            maskFlag = true
            maskData = masksData[i].data
          }
        }

        // offset to specified slice
        var sliceSize = cols * rows;
        var sliceOffset = sliceSize * slice;
        // draw pixels
        for (var row = 0; row < rows; row++) {
            var rowOffset = row * cols;

            for (var col = 0; col < cols; col++) {
                var offset = sliceOffset + rowOffset + col;
                // var value = typedData[offset];
                var value = niftiImage[offset];
                if (maskFlag) {
                  // var value1 = maskData[offset];
                  
                  if (maskData[col][row] !== 0) {
                    // console.log(maskData, maskData[offset], value)
                    canvasImageData.data[(rowOffset + col) * 4] = value;
                    canvasImageData.data[(rowOffset + col) * 4 + 1] = 0;
                    canvasImageData.data[(rowOffset + col) * 4 + 2] = 0;
                    canvasImageData.data[(rowOffset + col) * 4 + 3] = 0xFF;
                  }
                  else {
                    canvasImageData.data[(rowOffset + col) * 4] = value ;
                    canvasImageData.data[(rowOffset + col) * 4 + 1] = value ;
                    canvasImageData.data[(rowOffset + col) * 4 + 2] = value ;
                    canvasImageData.data[(rowOffset + col) * 4 + 3] = 0xFF;
                  }
                } else {
                  canvasImageData.data[(rowOffset + col) * 4] = value ;
                  canvasImageData.data[(rowOffset + col) * 4 + 1] = value ;
                  canvasImageData.data[(rowOffset + col) * 4 + 2] = value ;
                  canvasImageData.data[(rowOffset + col) * 4 + 3] = 0xFF;
                }


            }
        }
        // console.log("canvasImageData", canvasImageData)
        // console.log("canvasImageData.data",canvasImageData.data[])
        ctx.putImageData(canvasImageData, 0, 0);
        return canvasImageData
    }
}