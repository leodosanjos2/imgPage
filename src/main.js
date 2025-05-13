class App {
  constructor() {
    this.imgList = [];
    this.cont = 0;
    this.imgForm = document.getElementById('image-form');
    this.galleryForm = document.getElementById('gallery');
    this.imgInput = document.getElementById('image-input');
    this.preview = document.getElementById('preview');
    this.popupContainer = document.getElementById('popup-container');
    this.spanImg = document.getElementById('spanImg');
    this.setupPreview();
    this.setupFormSubmit();
    
    this.spanImg.addEventListener('click', () => this.closePopup());
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') this.closePopup();
    })
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
    const imgContainer = document.createElement('div');
    const btnDelete = document.createElement('button');
    const imgElement = new Image();

    imgElement.className = 'image';
    imgElement.src = ImgUrl;
    imgElement.alt = `Imagem ${this.cont}`;
    imgContainer.className = 'img-container';

    btnDelete.className = 'hoverbtn btn-delete';
    btnDelete.textContent = 'Excluir';
    btnDelete.onclick = () => this.removeImg(ImgUrl);
    
    const cloneImg = imgElement.cloneNode(true);
    // varíavel auxiliar para clonar a imagem, vendo que a imagem só pode estar em um local só por vez
    cloneImg.classList.add('popup-image');
    this.popupContainer.innerHTML = '';
    console.log(cloneImg)
    this.popupContainer.appendChild(cloneImg)
    this.popupContainer.appendChild(this.spanImg)
    

    imgContainer.appendChild(imgElement);
    imgContainer.appendChild(btnDelete)
    imgContainer.addEventListener('click', () => this.showPopUp(ImgUrl));
    
    
    this.galleryForm.appendChild(imgContainer);
    
    this.imgList.push({
      container: imgContainer,
      url: ImgUrl,
      btns:{
        delete: btnDelete,
      }
    });

    this.imgInput.value = '';
    this.preview.innerHTML = '';

  }
  removeImg(url) {
    const itemIndex = this.imgList.findIndex( item => item.url === url);

    if (itemIndex !== -1){
      const item = this.imgList[itemIndex];
      if (item.container && item.container.parentElement) {
        item.container.parentElement.removeChild(item.container);
      }
    }

    URL.revokeObjectURL(url);
    this.imgList = this.imgList.filter(item => item.url !== url);
  }
  showPopUp(url){
    const popupImg = this.popupContainer.querySelector('img');
    if (popupImg){
      popupImg.src = url;
    }
    this.popupContainer.style.display = 'flex';
  }

  closePopup(){
    this.popupContainer.style.display = 'none';
  }
  
}

new App();