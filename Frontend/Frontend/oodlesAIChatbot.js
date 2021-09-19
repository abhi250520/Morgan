jQuery(document).ready(function ($) {

    var url_string = window.location; //window.location.href
    var url = new URL(url_string);
    var user_name = url.searchParams.get("user_name");
    console.log(user_name);

    setTimeout(function () {
        openChat();
    }, 5000);

    setTimeout(function () {
        hideChatWithUsPopup();
    }, 3000)

    hideChatWithUsPopup = function () {
        $(".chat-with-us").hide();
        $(".chat-bubble").hide();
    }





    var mess="Say hello"
    var myEscapedJSONString = mess.replace(/\\n/g, "\\n")
    $("#initreply").hide();
    var request = JSON.stringify({
    "text": myEscapedJSONString,
    "token": token
    });
    
    jQuery.ajax({
    url: 'http://103.46.239.133:8002/chat?user_name=' + user_name,
    type: "POST",
    data: request,
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    beforeSend: function (x) {
    $("#wave").show()
    $(".chatUi").scrollTop($("#chat-output").prop('scrollHeight'));
    $("#user-input").val('');
    $("#quickReplies").html("");
    },
    success: function (result) {
    $("#wave").hide();
    
    // integrateResponse(result);
    
    setQuickResponse(result.quickReplies);
    
    // scrollToView();
    }
    });







    jQuery(".form-container").hide();
    jQuery('.chat--icon').show();
    jQuery('.chat-bubble-icon').hide(0).delay(700).fadeIn(2000);
    $('.chat--icon').hide(0).delay(500).fadeIn(100);
    var outputArea = $("#chat-output");
    var message
    var count = 0;
    var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // outputArea.html(`
    // <div class = "receive-message">
    //     <div class="received_withd_msg user-message"><p class="message">Welcome to Oodles AI! 
    //         We offer diversified artificial intelligence services
    //         for enterprises</p> </div> </div>`
    // );
    //To prevent next line on Enter press in input box
    $("#user-input").keydown(function (e) {
        if (e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
        }
    });




    $("#user-input").keyup(function (e) {
        var message = $("#user-input").val().trim();
        if (message != '' && message != null && message != 'null') {
            $("#submitInputButton").prop('disabled', false);
            $(".fa-paper-plane").css("color", "#2f83c5");
        } else {
            $("#submitInputButton").prop('disabled', true);
            $(".fa-paper-plane").css("color", "#8a8787");
        }
        if ((e.keyCode == 13 || e.which == 13) && $("#user-input").val() != null) {
            submitInput();
        }
    });


    $('#restart').click(function () {
        $.post('http://103.46.239.133:8002/toggle_active?user_name=' + user_name, function (data, status) {
            console.log(data);
            console.log(status);
            // window.location.href="http://103.46.239.133:8002/active?user_name="+user_name;
            location.reload(true);

            localStorage.setItem("isRestartClicked", true);


            outputArea.append(` 
            <div class="row incoming_msg"><div class="sent_msg" style="margin-top:5px; margin-bottom:5px;"><p style="margin-top:5px">new conversation has started.</p></div></div>`);

        })
    })
    var show_modal_or_not=0;
    console.log("value",show_modal_or_not);

    window.addEventListener('load', (event) => {
        $.post('http://103.46.239.133:8002/active?user_name=' + user_name, function (data, status) {
            console.log(data);
            console.log(status);
            for (let [key, value] of Object.entries(data)) {
                console.log(value);

                var message = value.Response.trim();
            show_modal_or_not=message.includes("Connecting you to our CSR");
            console.log(show_modal_or_not);
            if (show_modal_or_not==true){
                break
            }
            }
            
            
            for (let [key, value] of Object.entries(data)) {
                console.log(value);

                var message = value.Response.trim();
                var User_Message = value.User_Message.trim();  
                
                

                if (User_Message.trim().length > 0 && User_Message!="Say hello") {
                    outputArea.append(` 
                <div class="outgoing_msg"><div class="sent_msg"><p style="margin-top:10px">${value.User_Message}</p></div></div>`);

                }

                if (message.trim().length > 0) {
                    outputArea.append(`
            <div  class="container outgoing_msg"><div class="chat-output received_withd_msg row" ><div style="color:black;margin-bottom:5px; margin-right:5px">${value.Response}</div></div></div>`);
                }

            }

        })
    });

    submitInput = function () {
        var message = $("#user-input").val().trim();
        if (message == '' || message == null || message == 'null') {
            return;
        }
        outputArea.append(`
        <div class="outgoing_msg"><div class="sent_msg" ><p style="margin-top:10px">${message}</p></div></div>`);
        var myEscapedJSONString = message.replace(/\\n/g, "\\n")
        $("#initreply").hide();
        var request = JSON.stringify({
            "text": myEscapedJSONString,
            "token": token
        });

        jQuery.ajax({
            url: 'http://103.46.239.133:8002/chat?user_name=' + user_name,
            type: "POST",
            data: request,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function (x) {
                $("#wave").show()
                $(".chatUi").scrollTop($("#chat-output").prop('scrollHeight'));
                $("#user-input").val('');
                $("#quickReplies").html("");
            },
            success: function (result) {
                $("#wave").hide();

                integrateResponse(result);
                scrollToView();
            }
        });
    };

    setInput = function (text) {
        $("#user-input").val(text);
        $("#initreply").hide();
        submitInput();
        // scrollToView();
    }
    // clickOnModalSection = function (event) {
    //     setInput(event);
    // }

    scrollToView = function () {
        // document.querySelector("message").scrollIntoView({block: "center"}); 

        const el = document.getElementsByClassName("received_withd_msg");
        el[el.length - 2].scrollIntoView();

    }

    addinitbutton = function (text) {
        // console.log("ed", text)
        var buttons = '<button type="button" class="replies" id="' + text + '" onClick="setInput(\'' + text + '\');scrollToView()">' + text + '</button>';
        $("#initreply").html(buttons);
    }


    clickOnModalSection = function (event) {
        addinitbutton(event);
    }
    
        
console.log("value of show_modal",show_modal_or_not);

var isRestartClicked=localStorage.getItem("isRestartClicked");

//if(isRestartClicked!="true"){
    //clickOnModalSection("Say Hello");
//}
//if(performance.navigation.type != performance.navigation.TYPE_RELOAD){
  //  clickOnModalSection("Say Hello");
    
  //  }


    integrateResponse = function (result) {
        var textReplies = result.text;
        // console.log("cfwe", result);
        var quickReplies = result.quickReplies;
        // var endConversation = result.endInteraction[0]

        if (textReplies) {
            if (count < 5) {
                addTextResponse(textReplies);
                count++;
            }
            else {
                addWithoutDelay(textReplies);
                count = 1;
            }
            // addTextResponse(textReplies);
            // $("#initreply").hide();
        }

        if (quickReplies.length) {
            //Check this code what it does
            $("input").prop('disabled', true);
            // $("#textField").hide();
            // $("#submitInputButton").hide();
            // var count = 0;
            setQuickResponse(quickReplies);

        } else {
            //Check this code what it does
            $("#textField").show();
            $("#submitInputButton").show();
            $("input").prop('disabled', false);
            $(".fa-paper-plane").css("color", "#8a8787");
        }

        $(".chatUi").scrollTop($("#chat-output").prop('scrollHeight'));

        // if (endConversation == "True") {
        //     $('#myLastModal').modal('show');
        // }
    }

    socketResponse = function (event) {
        var textReplies = event.data;
        if (textReplies) {
            addTextResponse(textReplies);
        }
        $(".chatUi").scrollTop($("#chat-output").prop('scrollHeight'));

    }



    addTextResponse = function (textReplies) {

        outputArea.append(`
                            <div class = "receive-message text-left">
                            <div class="received_withd_msg user-message"><p class="message ">${textReplies}</p> </div></div>`);
        $(".chatUi").scrollTop($("#chat-output").prop('scrollHeight'));

    }



    addWithoutDelay = function (textReplies) {
        for (var i = 0; i < textReplies.length; i++) {
            outputArea.append(`
                            <div class = "receive-message">
                            <div class="received_withd_msg user-message"><p class="message ">${textReplies[i]}</p> </div></div>`);
            $(".chatUi").scrollTop($("#chat-output").prop('scrollHeight'));
        }
    }


    setQuickResponse = function (quickReplies) {
        var buttons = "";
        for (var i = 0; i < quickReplies.length; i++) {
            buttons += '<button type="button" class="replies" id="' + quickReplies[i] + '" onClick="setInput(\'' + quickReplies[i] + '\');">' + quickReplies[i] + '</button>';
        }
        $("#quickReplies").html(buttons);
    }


    var mySocket = new WebSocket("ws://103.46.239.133:8002/ws/");
    let timer = null;
    mySocket.onopen = () => {
        timer = setInterval(() => {
            mySocket.send('hello');
        }, 1000);
    };

    // add event listener reacting when message is received
    mySocket.onmessage = function (event) {
        console.log(event.data)
        socketResponse(event);

    };

    mySocket.onclose = socket.onerror = () => {
        clearInterval(timer);
    };

});


function openChat() {
    jQuery(".form-container").show();
    jQuery(".float").addClass('expand');
    jQuery('#chat-cross').hide();
    jQuery('#user-input').focus();
    jQuery('.chat--icon').hide();
}
function closeChat() {
    jQuery(".float").show();
    jQuery(".float").removeClass('expand');
    jQuery(".form-container").hide();
    jQuery(".chat--icon").show();
}

function closeChatBubble() {
    jQuery("#chat-cross").hide();
}

