const hide = document.getElementById('message')
if (hide) {
    hide.onclick = function () {
        this.style.display = 'none';
    };
}