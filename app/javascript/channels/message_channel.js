import consumer from "./consumer"
window.addEventListener('load', function(){

consumer.subscriptions.create("MessageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },
 
  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const truncateWithHTML = (string, max) => {
        // string = "<span class='className'>My long string that</span> I want shorter<span> but just a little bit</span>"

        const noHTML = string.replace(/<[^>]*>/g, '');

        // if the string does not need to be truncated
        if (noHTML.length <= max){
            return string;
        }

        // if the string does not contains tags
        if (noHTML.length === string.length){
            // add <span title=""> to allow complete string to appear on hover
            return `<span title="${string}">${string.substring(0, max).trim()}…</span>`;
        }

        const substrings =  string.split(/(<[^>]*>)/g).filter(Boolean);
        // substrings = ["<span class='className'>","My long string that","</span>"," I want shorter","<span>"," but just a little bit","</span>"]

        let count = 0;
        let truncated = [];
        for (let i = 0; i < substrings.length; i++) {
            let substr = substrings[i];
            // if the substring isn't an HTML tag
            if (! substr.startsWith("<")){
                if (count > length){
                    continue;
                } else if (substr.length > (length-count-1)){
                    truncated.push(substr.substring(0, (length-count) - 1) + '…');
                } else {
                    truncated.push(substr);
                }
                count += substr.length;
            } else {
                truncated.push(substr);
            }
        }

        return `<span title="${noHTML}">${truncated.join("")}…</span>`;
    }

    const html = `  <div id="test-${data.id}">
                    <img style="float: left; width:30px; height:30px; border-radius:50%;display: inline-block;" src="${data.image_url}">
                    <div style="margin-bottom: 50px;float: left; margin-left: 30px; display: inline-block; padding-left: 15px; padding-right: 15px; min-height: 90px; border-radius: 10px; border: 2px ; background-color: #f0f2f5;">
                    <span style="font-size: 20px; margin-bottom: 0rem;"><a href="/users/${data.user.id}">${data.user.email}</a></span>
                    <a id="delete-btn", data-method="delete" href="/posts/${data.post.id}/comments/${data.id}"><button id="${data.id}"style="text-color: black; 
                    font-size: 10px; height: 22px; border-radius: 10px; border: 2px ; background-color: #f0f2f5;"><img style="width:15px; height:15px;" src="/assets/delete-33f3ab6467bbbe3b27452c25246730db69ca52bbe50cd001e418186a222d146f.jpg"></button></a>
                    <p style="font-size: 10px; margin-bottom: 5px;">(${data.date})</p>
                    <p style="max-width: 1020px; word-wrap: break-word; font-size: 20px; margin-bottom: 5px;">${data.content.content}</p>
                    </div></div><br>`;
    const html2 = `<span>${data.num_not_check}</span>`;
    const html3 = `
                      <p style="border: 1px dashed #000000; border-radius: 10px; padding: 0.4rem 0.8rem;">
                        <a href="/posts/${data.post.id}">
                          ${data.user.email} ${data.notification.notice_type} on "${truncateWithHTML(data.post.title, 17)}"</a>
                      </p>
                  `;
    // const messages = document.getElementById('collapseExample');
    // const newMessage = document.getElementById('comment_content');
    // messages.insertAdjacentHTML('beforebegin',html);
    // newMessage.value='';
    // const countComment = document.getElementById('collapseExample').lenght;
    // console.log(messages)

    if (Notification.permission === "granted") {
        var notification = new Notification("You received a new comment!", {
          icon: "https://banner2.cleanpng.com/20180806/oqx/kisspng-naver-blog-logo-computer-icons-%EC%86%8C%EC%85%9C%EB%9F%AC%EB%8B%9D-%EB%8B%AC%EB%8B%A4-%EC%BD%98-5b686791b44591.7849416415335689137384.jpg",
          body: `${data.user.email} ${data.notification.notice_type} on "${data.post.title}"`,
        });

        notification.onclick = function () {
          window.open(`/posts/${data.post.id}`);
        };

        setTimeout(function(){
          notification.close();
        },5000);
      } else {
        Notification.requestPermission();
      }

    $('.comment_body ul').append(html)
    $(`.count-${data.post.user_id}`).html(html2)
    $(`.tb_list_${data.post.user_id}`).append(html3)
    $('#comment_content').val(null)


  }
});
})


