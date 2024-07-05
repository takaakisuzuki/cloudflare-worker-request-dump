export default {
  async fetch(request, env) {
    let html_content = '';
    let html_style = 'body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;} div.check {padding: 0px 0px 0px 0px; display: table; margin: 36px auto auto auto;}';
    //const html_uuid = crypto.randomUUID();
    const url = new URL(request.url);
    const myparam = url.searchParams.get('uuid');    
    let value = await env.MY_KV.get('myparam');
    
    //await env.MY_BUCKET.put(html_uuid, 'Test write R2 Bucket');
    await env.MY_Q.send({
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers),
    });

    //await env.MY_D.prepare("INSERT INTO data id values 1").bind().run()
        
    html_content += '<p> <strong> Worker KV value: </strong> ' + value + '</p>';
    html_content += '<p> <strong> UUID: </strong> ' + html_uuid + '</p><br>';
    html_content += '<p> <strong> AS Number: </strong> ' + request.cf.asn + '</p>';
    html_content += '<p> <strong> AS Organization: </strong>' + request.cf.asOrganization + '</p>';
    html_content += '<p> <strong> Bot Management: </strong>' + request.cf.botManagement + '</p>';
    html_content += '<p> <strong> Client Accept Encoding: </strong>' + request.cf.clientAcceptEncoding + '</p>';
    html_content += '<p> <strong> Colo: </strong>' + request.cf.colo + '</p>';
    html_content += '<p> <strong> Country: </strong>' + request.cf.country + '</p>';
    html_content += '<p> <strong> City: </strong>' + request.cf.city + '</p>';
    html_content += '<p> <strong> Is EU Country: </strong>' + request.cf.isEUCountry + '</p>';
    html_content += '<p> <strong> HTTP Protocol: </strong>' + request.cf.httpProtocol + '</p>';
    html_content += '<p> <strong> Request Priority: </strong>' + request.cf.requestPriority + '</p>';
    html_content += '<p> <strong> TLS Cipher: </strong>' + request.cf.tlsCipher + '</p>';
    html_content += '<p> <strong> TLS Client Auth: </strong>' + request.cf.tlsClientAuth + '</p>';
    html_content += '<p> <strong> TLS Client HelloLength: </strong>' + request.cf.tlsClientHelloLength + '</p>';
    html_content += '<p> <strong> TLS Client Random: </strong>' + request.cf.tlsClientRandom + '</p>';
    html_content += '<p> <strong> TLS Client Version: </strong>' + request.cf.tlsVersion + '</p>';
    html_content += '<p> <strong> Colo: </strong>' + request.cf.colo + '</p>';
    html_content += '<p> <strong> Country: </strong>' + request.cf.country + '</p>';
    html_content += '<p> <strong> City: </strong>' + request.cf.city + '</p>';
    html_content += '<p> <strong> Continent: </strong>' + request.cf.continent + '</p>';
    html_content += '<p> <strong> Latitude: </strong>' + request.cf.latitude + '</p>';
    html_content += '<p> <strong> Longitude: </strong>' + request.cf.longitude + '</p>';
    html_content += '<p> <strong> PostalCode: </strong>' + request.cf.postalCode + '</p>';
    html_content += '<p> <strong> MetroCode: </strong>' + request.cf.metroCode + '</p>';
    html_content += '<p> <strong> Region: </strong>' + request.cf.region + '</p>';
    html_content += '<p> <strong> RegionCode: </strong>' + request.cf.regionCode + '</p>';
    html_content += '<p> <strong> Timezone: </strong>' + request.cf.timezone + '</p>';

    let html = `<!DOCTYPE html>
      <head>
        <title> Takaaki: Request Cloudflare dump by GitHub Action 20240418 </title>
        <style> ${html_style} </style>
        <script>
        var ref;
        var regex = new RegExp("refresh=1");
          
        function checkRefresh() {
            if ( regex.test(document.cookie) ) {
                document.getElementById("check").checked = true;
                ref = setTimeout( function() { location.reload(); }, 1000 );
            }
        }
          
        function changeCookie() {
            if ( document.getElementById("check").checked ) {
                document.cookie = "refresh=1";
                ref = setTimeout( function() { location.reload(); }, 1000 );
            }
            else {
                document.cookie = "refresh=0";
                clearTimeout(ref);
            }
        }
        </script>
      </head>
      <body>
        <img alt="Cloudflare Logo" src="data:image/png;base64,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"/>
        <h1>Takaaki Workers: Request Cloudflare Edge dump by GitHub Action 20240418</h1>
        <input type="checkbox" id="check" onchange="changeCookie()"> Refresh reqeuest<br>
        ${html_content}
        <p>GitHub Repository: <a href="https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties">https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties</a></p>
        <p>GitHub Repository: <a href="https://github.com/takaakisuzuki/cloudflare-worker-request-dump">https://github.com/takaakisuzuki/cloudflare-worker-request-dump</a></p>
      </body>`;

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  },
};
