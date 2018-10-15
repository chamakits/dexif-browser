/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');

var inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles(event) {
  // var fileList = this.files; /* now you can work with the file list */
  // var file = fileList[0];
  console.log({event});
  var file = event[0];
  console.log({file});
  const piexif = window.piexif;
  console.log({piexif});
  var zeroth = {};
  var exif = {};
  var gps = {};
  zeroth[piexif.ImageIFD.Make] = "Make";
  zeroth[piexif.ImageIFD.XResolution] = [777, 1];
  zeroth[piexif.ImageIFD.YResolution] = [777, 1];
  zeroth[piexif.ImageIFD.Software] = "Piexifjs";
  exif[piexif.ExifIFD.DateTimeOriginal] = "2010:10:10 10:10:10";
  exif[piexif.ExifIFD.LensMake] = "LensMake";
  exif[piexif.ExifIFD.Sharpness] = 777;
  exif[piexif.ExifIFD.LensSpecification] = [[1, 1], [1, 1], [1, 1], [1, 1]];
  gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
  gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";
  
  // S1
  // gps[piexif.GPSIFD.GPSLatitudeRef] = "N";
  // gps[piexif.GPSIFD.GPSLatitude] = [0, 0];
  // gps[piexif.GPSIFD.GPSLongitudeRef] = "W";
  // gps[piexif.GPSIFD.GPSLongitude] = [0, 0];
  // console.log({gps});
  // E1
  
  var exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};
  var exifStr = piexif.dump(exifObj);

  var reader = new FileReader();
  reader.onload = function(e) {
      let inserted = piexif.insert(exifStr, e.target.result);

      let image = new Image();
      image.src = inserted;
      image.width = 200;
      let newDiv = document.createElement('div');
      let el = newDiv.appendChild(image);
      let list = document.getElementById('list')
      list.appendChild(el);

  };
  reader.readAsDataURL(file);
  
}

function save(filename, data) {
    var blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}
