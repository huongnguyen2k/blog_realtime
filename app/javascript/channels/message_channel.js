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
    const html = `  <div id="test-${data.id}">
                    <img style="float: left; width:30px; height:30px; border-radius:50%;display: inline-block;" src="${data.image_url}">
                    <div style="margin-bottom: 50px;float: left; margin-left: 30px; display: inline-block; padding-left: 15px; padding-right: 15px; min-height: 90px; border-radius: 10px; border: 2px ; background-color: #f0f2f5;">
                    <span style="font-size: 20px; margin-bottom: 0rem;"><a href="/users/${data.user.id}">${data.user.email}</a></span>
                    <a id="delete-btn", data-method="delete" href="/posts/${data.post.id}/comments/${data.id}"><button id="${data.id}"style="text-color: black; 
                    font-size: 10px; height: 22px; border-radius: 10px; border: 2px ; background-color: #f0f2f5;"><img style="width:15px; height:15px;" src="/assets/delete-33f3ab6467bbbe3b27452c25246730db69ca52bbe50cd001e418186a222d146f.jpg"></button></a>
                    <p style="font-size: 10px; margin-bottom: 5px;">(${data.date})</p>
                    <p style="max-width: 1020px; word-wrap: break-word; font-size: 20px; margin-bottom: 5px;">${data.content.content}</p>
                    </div></div><br>`;

    const messages = document.getElementById('collapseExample');
    const newMessage = document.getElementById('comment_content');
    messages.insertAdjacentHTML('beforebegin',html);
    newMessage.value='';
    const countComment = document.getElementById('collapseExample').lenght;
    console.log(messages)
  }
});
})