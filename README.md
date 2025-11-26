# js-lib
In order to provide a js lib example, it was created a component named warning banner.
This component includes: HTML + CSS + JS + External API data.

## Integration
To integrate this web component add to your html:

```
<script type="module" src="https://soniasilvadf.github.io/web-component/banner.js"></script>
<warning-banner></warning-banner>
```

You can set parameters:
- title
- appToken
- settings
- apiUrl

```
    const banner = new Banner({
      title: "Atenção",
      settings: { width: "80%", top: "20px" },
      appToken: 'XPTO'
    });

```

And also some CSS properties:
- width
- position (absolute, relative, fixed, ...)
- top (10px, 0px, 5vh, ...)
- left
- right
- width
- height
- z-index


```
    const banner = new Banner({
      position: "absolute",
    });
```

For testing purposes, it was also provided a parameter supporting all the above CSS properties but in a JSON, by specifying settings property:
```
const banner = new Banner({
      settings: { width: "80%", top: "20px" }
    });
```

### DF-UI
It was tested adding icons from DF-UI, by importing the font: https://doutorfinancas.github.io/df-ui/Icons-DF.ttf
The CSS in that case should be a separated file, to be suit a more clean structure.

### Angular support
If you want to integrate in your angular component: you can!
You should import:

```
import 'https://soniasilvadf.github.io/js-lib/banner-lib.js';
```

outside the component you should declare the empty class, that then it will be set after import:

```
declare var Banner: any;
```

and then customize and create a div to render the content:
```
const banner = new Banner({
      title: "Atenção",
      settings: { width: "80%", top: "20px" },
      appToken: 'XPTO'
});
banner.render("#banner-container");
```

## API data
The banner calls an external API to add data, and you can override it with:
```
const banner = new Banner({
      title: "Atenção",
      settings: { width: "80%", top: "20px" },
      apiUrl: 'https://clinica-frontops-api.staging.aws.doutorfinancas.pt//user/loginData'
    });
```
