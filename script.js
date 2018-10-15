/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

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
  
  var exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};
  var exifStr = piexif.dump(exifObj);

  var reader = new FileReader();
  reader.onload = function(e) {
      let inserted = piexif.insert(exifStr, e.target.result);

      let image = new Image();
      image.src = inserted;
      image.width = 200;
      let newDiv = document.createElement('div');
      let label = document.createElement('p');
      label.textContent = "Right click or long press to save image";
      
      let el = newDiv.appendChild(image);
      newDiv.appendChild(label);
      let li = document.createElement('li');
      li.appendChild(newDiv);
      let list = document.getElementById('list')
      list.appendChild(li);

  };
  reader.readAsDataURL(file);
  
}
