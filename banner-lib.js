export class Banner {
    constructor(options = {}) {
        this.API_URL = options.apiUrl || 'https://jsonplaceholder.typicode.com/posts/1';
        this.title = options.title || 'Aviso';
        this.message = options.message || 'Serviços indisponíveis';
        this.settings = {
            top: options.top || '0px',
            left: options.left || '0px',
            right: options.right || '0px',
            width: options.width || 'auto',
            height: options.height || 'auto',
            position: options.position || 'absolute',
            zIndex: options.zIndex || '1',
            ...options.settings
        };
    }

    async render(targetSelector) {
        const target = document.querySelector(targetSelector);
        if (!target) return;

        try {

            const myHeaders = new Headers({
                'Authorization': 'Bearer ' + this.getCookie('df_id_token')
            });

            const response = await fetch(this.API_URL, {
                headers: myHeaders,
                method: 'GET'
            });
            const data = await response.json();

            target.innerHTML = `
                ${this.getStyles()}
                <div class="banner">
                    <i class="df-icon-l df-icon-close float-right"></i>
                    <h2>${this.title}</h2>
                    <p>${this.message}</p>
                    <p>Example API data: ${data?.user?.username}</p>
                </div>
            `;
                } catch (error) {
                    target.innerHTML = `
                <div class="banner" style="background:red; color:white; padding:1rem;">
                Erro ao carregar dados da API
                </div>
            `;
            console.error('Error:', error);
        }
    }

    getStyles() {
        const s = this.settings;
        return `
      <style>
        
        @font-face {
            font-family: Icons-DF;
            src: url(https://doutorfinancas.github.io/df-ui/Icons-DF.ttf) format("truetype");
            font-weight: 400;
            font-style: normal;
            font-display: block
        }

        [class*=" df-icon-"],[class^=df-icon-] {
            font-family: Icons-DF,sans-serif!important;
            speak: never;
            font-style: normal;
            font-weight: 400;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
        }

        .df-icon-close:before {
            content: "\\e966";
        }
        .float-right {
            float: right;
        }

        .banner {        
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem;
          background: #f9f9f9;
          box-sizing: border-box;
          top: ${s.top};
          left: ${s.left};
          right: ${s.right};
          width: ${s.width};
          height: ${s.height};
          position: ${s.position};
          z-index: ${s.zIndex};
        }
        .banner h2 {
          margin: 0 0 0.5rem 0;
          color: #007acc;
        }
      </style>`;
    }
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = decodeURIComponent(document.cookie).split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}
