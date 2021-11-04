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
   
    const html = `<div id="test-${data.id}" style="padding-left: 15px; padding-right: 15px; min-height: 90px; border-radius: 10px; border: 2px ; background-color: #f0f2f5;">
                    <span style="font-size: 20px; margin-bottom: 0rem;"><a href="/users/${data.user.id}">${data.user.email}</a></span>
                    <a id="delete-btn", data-method="delete" href="/posts/${data.post.id}/comments/${data.id}"><button id="${data.id}"style="text-color: black; font-size: 10px; height: 22px; border-radius: 10px; border: 2px ; background-color: #f0f2f5;">(Delete)</button></a>
                    <p style="font-size: 10px;margin-bottom: 5px;">(${data.date})</p>
                    <p style="max-width: 1020px; word-wrap: break-word; font-size: 20px; margin-bottom: 5px;">${data.content.content}</p>
                  </div><br>`;

    const messages = document.getElementById('collapseExample');
    const newMessage = document.getElementById('comment_content');
    messages.insertAdjacentHTML('beforebegin',html);
    newMessage.value='';
    const countComment = document.getElementById('collapseExample').lenght;
      console.log(messages)
  }
});
})