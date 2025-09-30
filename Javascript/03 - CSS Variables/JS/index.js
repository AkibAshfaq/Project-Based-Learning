const input = document.querySelectorAll('.controls input');

    function handleupdate(){
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    input.forEach(input => input.addEventListener('change', handleupdate));
    input.forEach(input => input.addEventListener('mousemove', handleupdate));
