class App {
  constructor() {
    this.imgList = [];
    this.cont = 0;
    this.imgForm = document.getElementById('image-form');
    this.galleryForm = document.getElementById('gallery');
    this.imgInput = document.getElementById('image-input');
    this.preview = document.getElementById('preview');

    this.setupPreview();
    this.setupFormSubmit();
  }
  setupPreview() {
    this.imgInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
          this.preview.innerHTML = `<img src="${event.target.result}">`;
        };
        reader.readAsDataURL(file);
      }
    });
  }
  setupFormSubmit(){
    this.imgForm.addEventListener('submit', event => {
      event.preventDefault();
      this.addImgView(event);
    })
  }

  addImgView(event){
    event.preventDefault();
    this.cont ++;
    const file = this.imgInput.files[0];
    const ImgUrl = URL.createObjectURL(file)
    const imgElement = document.createElement('img');
    imgElement.className = "image";
    imgElement.src = ImgUrl;
    imgElement.alt = `Imagem ${this.cont}`;

    
    this.galleryForm.appendChild(imgElement);
    this.imgList.push({
      element: imgElement,
      url: ImgUrl
    });

    this.imgInput.value = '';
    this.preview.innerHTML = '';

  }
  
}

new App();