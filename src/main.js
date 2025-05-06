class App {
  constructor() {
    this.imgList = [];
    this.imgForm = document.getElementById('repo-submit');
    this.teste = document.getElementById('teste');
    this.imgInput = document.querySelector('input[type="file"]'); // Corrigido aqui
    this.preview = document.getElementById('preview');
    this.previewImage();
    this.callImg();
  }
  previewImage() {
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
  callImg(){
    this.imgForm.onsubmit = event => ths.addImgView(event)
  }

  addImgView(event){
    event.preventDefault();
    const imagem = document.createElement('img');
    imagem.src = URL.createObjectURL(this.imgInput);
    this.teste.appendChild(imagem);
    this.imgList.push(imagem)

  }
  
}

new App();