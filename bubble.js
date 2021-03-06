var me = {};
      me.avatar =
        "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

      var you = {};
      you.avatar =
        "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

      var isQuiz = false
      var numberOfMessages = 0;
      var maxMessageCount = 5;

      function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
      }

      //-- No use time. It is a javaScript effect.
      function insertChat(who, text, time) {
        if (time === undefined) {
          time = 0;
        }
        var control = "";
        var date = formatAMPM(new Date());

        if (who == "Lorenas") {
          control =
            //'<li style="width:100%">' +

            `<div class="main msg-container">
      			<div id="spinner" class="speech-wrapper">
                      <div class="bubble">
                          <div class="txt">
                              <p class="name">${who}</p>
                              <p class="message">${text}</p>
                              <span class="timestamp">${date}</span>
                          </div>
                          <div class="bubble-arrow"></div>
                  	</div>
      			</div>`;

          //'<div class="msj macro">' +
          //'<div class="avatar"><img class="img-circle" style="width:100%;" src="' + me.avatar + '" /></div>' +
          //'<div class="text text-l">' +
          //'<p>' + text + '</p>' +
          //'<p><small>' + date + '</small></p>' +
          //'</div>' +
          //'</div>' +
          //'</li>'
        } else {
          control =
            //'<li style="width:100%;">' +

            `<div class="main msg-container">
      			<div id="spinner" class="speech-wrapper me">
              		<div class="bubble">
              			<div class="txt">
              				<p class="name alt">${who}</p>
              				<p class="message">${text}</p>
              				<span class="timestamp">${date}</span>
              			</div>
              			<div class="bubble-arrow alt"></div>
              		</div>
      			</div>
      		</div>`;

          //'<div class="msj-rta macro">' +
          //'<div class="text text-r">' +
          //'<p>' + text + '</p>' +
          //'<p><small>' + date + '</small></p>' +
          //'</div>' +
          //'<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + you.avatar + '" /></div>' +
          //'</li>'
        }
        //setTimeout(
        //  function () {
        $("#story").append(control).scrollTop($("#story").prop("scrollHeight"));
        
        isQuiz = false;
      }

      function insertQuiz(question, options, message_correct, message_wrong, answer_id) {

        var q_option = '';
        for (var i=0; i<options.length; i++)
        {
          q_option += options[i];
        }

        quiz_body = `<div class="quiz msg-container" >
                    <div id="question">${question}</div>
                    ${q_option}
                    <input type="submit" name="submit" class="btn_asnwer" value="Atsakyti" 
                    onClick="
                      var msg = '';
                      if (document.getElementById('${answer_id}').checked)
                      { msg = '${message_correct}'; }
                      else { msg = '${message_wrong}';}
                      alert(msg);
                      isQuiz = false;
                    ">
                    </div>`;
      
      $("#story").append(quiz_body).scrollTop($("#story").prop("scrollHeight"));

      isQuiz = true;
      }

      function resetChat() {
        $("#story").empty();
      }
      
      $(".mytext").on("keydown", function (e) {
        if (e.which == 13) {
          var text = $(this).val();
          if (text !== "") {
            insertChat("me", text);
            $(this).val("");
          }
        }
      });

      function createMessage(who, text, time) {
        var message = {};
        message.who = who;
        message.text = text;
        message.time = time;

        return message;
      }

      function createQuiz(question, options, message_correct, message_wrong, answer_id)
      {
        var quiz = {};
        quiz.question = question;
        quiz.options = options;
        quiz.message_correct = message_correct;
        quiz.message_wrong = message_wrong;
        quiz.answer_id = answer_id;

        return quiz;
      }

      let messages = [
        createMessage("Lorenas", "Alio?", 0),
		createMessage("Lorenas", "Ar mane kas girdi?", 0),
    createQuiz("Kas ??ia vyksta?"
    , ['<div><input type="radio" name="q1" id="opt1"><label for="opt1">1 valanda</label></div>',
        '<div><input type="radio" name="q1" id="opt2"><label for="opt2">17 valand??</label></div>',
        '<div><input type="radio" name="q1" id="opt3"><label for="opt3">21 valanda</label></div>'], "teisingai", "pro ??al??", "opt2"),
                
    createMessage("Operatorius", "Taip, sveiki sveiki, puikiai girdisi.", 1500),
    createMessage("Lorenas", "Labai gerai, band??iau jau susisiekti kelias valandas ir jokio signalo???",3500),
    createMessage("Lorenas", "Mano vardas Lorenas. A?? buvau..Na a?? esu astronautas laivo ??guloje pavadinimu Dariano.", 7000),
		createMessage("Operatorius", "A?? tuoj sutikrinsiu palaukite sekund??l??.", 1500),
		createMessage("Lorenas", "Ne, pra??au b??kite su manim, a?? jau ??ia??? Net ne??inau kiek.", 7000),
		createMessage("Operatorius", "Tuoj sekund??l?? man reik tik patikrinti???.", 1500),
		createMessage("Operatorius", "Norite pasakyti J??s esate ??gulos narys Dariano laivo, kuris tur??jo nugabent krovin?? ?? m??nul?? taip?", 1500),
		createMessage("Lorenas", "Tikrai taip.", 7000),
		createMessage("Lorenas", "Mes papuol??me ?? ka??koki?? turbulentin?? duob?? ir dabar ne??inau. Mano kajut??s durys u??darytos ??ia beveik n??ra ??viesos, o per racij?? niekas neatsako. ", 7000),
		createMessage("Operatorius", "Sekund??l??.", 1500),
		createMessage("Lorenas", "Atsipra??au bet man atrodo a?? jos tikrai dabar neturiu...", 7000),
		createMessage("Operatorius", "Ar gal??tum??t primint savo vard??? ", 1500),
		createMessage("Lorenas", "Lorenas??? Lorenas mano vardas. ", 7000),
		createMessage("Operatorius", "Lorenai, kas ??ia pas j??s pypsi? ", 1500),
		createMessage("Lorenas", "Lorenas??? Lorenas mano vardas. ", 7000),
		createMessage("Lorenas", "Tai yra mano kostiumo daviklis, kai jis pilnai pakrautas turime 200 valand??, dabar like tik 17 procent??. ", 7000),
		createMessage("Lorenas", "U??duotis skai??iavimo su procentais", 7000),
		createMessage("Operatorius", "Supratau Lorenai, turime tik vien?? nedidel?? keblum??.", 1500),
        createMessage("Lorenas", "Kok??, b??t?? ??domu su??inoti? ", 7000),
		createMessage("Operatorius", "J??s?? laivas skaitosi, kaip ding??s jau 7 metus...", 1500),
		createMessage("Lorenas", "Atsipra??au, mano galva dar neatsigavo visi??kai, i??girdau, jog 7 metus, J??s tur??jote galvoje 7 valandas, taip operatoriau? ", 7000),
		createMessage("Operatorius", "Ne, d??ja a?? visk?? sutikrinau. Dirbu naktin?? pamain?? ir jau sukviet??s ??mon??s, kurie gal??tu paa??kinti situacij??, kuri dabar vyksta.", 1500),
		createMessage("Lorenas", "Septyni metai? J??s tikriausiai juokaujate man reikia kuo grei??iau i?? ??ia i??tr??kti???", 7000),
		createMessage("Juregenas", "Lorenai Sveiki, kapitonas Jurgenas.", 1500),
		createMessage("Lorenas", "Kapitone, J??s?? balsas man labai gird??tas, tik dabar negaliu prisimint kur. Apskritai dabar ma??ai k?? prisimenu.", 7000),
		createMessage("Lorenas", "Ar mane dar girdite?", 7000),
		createMessage("Lorenas", "K?? man daryt toliau?", 7000),
		createMessage("Juregenas", "Lorenai negaliu patik??t, kad tai J??s. A?? buvau j??s?? vadas ??em??je, kur sudariau komand?? i?? 4 ??moni?? ar kiti ??gulos nariai kartu su jumis?", 1500),
		createMessage("Lorenas", "Atsipra??au pone. A?? kolkas kajut??je ir negaliu atidaryt dur?? pra??o kodo, jo neatsimenu. Sugeb??jau tik prisikviest operatori?? per radij??.", 7000),
		createMessage("Juregenas", "Taip, J??s?? ??gula tur??jo paimti special?? materija, kur?? susiformavo m??nylyje, kai mes pasteb??jome per teleskop??, bet pakeliui ?? m??nul?? J??s patekote ?? juod?? skyl??, kuri buvo ant tiek ma??a, jog net rodikliai nepasteb??jo.", 1500),
		createMessage("Juregenas", "??iuo metu m??s?? davikliai Tav??s nemato. B??t?? gerai, jog i??eitum i?? kajut??s ir ant kapitono panel??s paspaustum radijo s??kikl?? matyt jis i??jungtas.", 1500),
		createMessage("Lorenas", "Supratau Kapitone", 7000),
		createMessage("Lorenas", "Pra??o kodo, a?? jo nelabai pamenu", 7000)
      ];

      $("body").click(function () {
        let msg = messages.shift();
        if (!isQuiz)
        {
          if (numberOfMessages > maxMessageCount)
            elem = $(".msg-container:first" ).first().remove();
          if (msg.hasOwnProperty('who')) {
            insertChat(msg.who, msg.text, msg.time);
          }
          else {
            insertQuiz(msg.question, msg.options, msg.message_correct, msg.message_wrong, msg.answer_id);
          }
          numberOfMessages += 1;
        }
      });

      console.log("messages==>", messages);

      $("body > div > div > div:nth-child(2) > span").click(function () {
        $(".mytext").trigger({ type: "keydown", which: 13, keyCode: 13 });
      });

      //-- Clear Chat
      resetChat();

      //-- Print Messages

      //insertChat("me", "Hello Vlad...", 0);
      //insertChat("you", "Hi, Pablo", 1500);
      //insertChat("me", "What would you like to talk about today?", 3500);
      //insertChat("you", "Tell me a joke", 7000);
      //insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
      //insertChat("you", "LOL", 12000);

      //-- NOTE: No use time on insertChat.