const fileInput = document.querySelector('.file-input');
const filterOptions = document.querySelectorAll('.filter button');
const filterName = document.querySelector('filter-info .name');
const filterValue = document.querySelector('.filter-info .value');
const filterSlider = document.querySelector('.slider input');
const rotateOptions = document.querySelectorAll('.rotate button');
const previewImage = document.querySelector('.preview-img img');
const resetFilterBtn = document.querySelector('.reset-filter');
const chooseImgBtn = document.querySelector('.choose-img');
const saveImgBtn = document.querySelector('.save-img');


let brightness = "100";
let saturation = "100";
let inversion = "0";
let grayscale = "0";
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;


const loadImg = () => {
    let file = fileInput.files[0];
    if(!file)   return;

    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}


const applyFilter = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector('.active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;

        if(option.id === "brightness")  {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === "inversion")    {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else    {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});


const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active');

    if(selectedFilter.id === 'brightness')  {
        brightness = filterSlider.value;
    }
    else if(selectedFilter.id === 'saturation') {
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id === 'inversion')  {
        inversion = filterSlider.value;
    }
    else    {
        grayscale = filterSlider.value;
    }

    applyFilter();
}


rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left")    {
            rotate -= 90;
        }
        else if(option.id === "right")  {
            rotate += 90;
        }
        else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else    {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }

        applyFilter();
    });
});


const resetFilter = () => {
    brightness = "100";
    saturation = "100";
    inversion = "0";
    grayscale = "0";
    rotate = 0;
    flipHorizontal = 1;
    flipVertical = 1;

    filterOptions[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0)    {
        ctx.rotate(rotate * Math.PI / 180);
    }

    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}



// driver.js
/* const driver = window.driver.js.driver;
const driverObj = driver();

 driverObj.highlight({
  element: ".filter",
  popover: {
    title: "Filters",
    description: "Customize your image according to your needs"
  }
}); */


filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImg);
chooseImgBtn.addEventListener("click", () => fileInput.click());