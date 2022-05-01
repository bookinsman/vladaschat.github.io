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
    createQuiz("Kas čia vyksta?"
    , ['<div><input type="radio" name="q1" id="opt1"><label for="opt1">1 valanda</label></div>',
        '<div><input type="radio" name="q1" id="opt2"><label for="opt2">17 valandų</label></div>',
        '<div><input type="radio" name="q1" id="opt3"><label for="opt3">21 valanda</label></div>'], "teisingai", "pro šalį", "opt2"),
                
    createMessage("Operatorius", "Taip, sveiki sveiki, puikiai girdisi.", 1500),
    createMessage("Lorenas", "Labai gerai, bandžiau jau susisiekti kelias valandas ir jokio signalo…",3500),
    createMessage("Lorenas", "Mano vardas Lorenas. Aš buvau..Na aš esu astronautas laivo įguloje pavadinimu Dariano.", 7000),
		createMessage("Operatorius", "Aš tuoj sutikrinsiu palaukite sekundėlę.", 1500),
		createMessage("Lorenas", "Ne, prašau būkite su manim, aš jau čia… Net nežinau kiek.", 7000),
		createMessage("Operatorius", "Tuoj sekundėlę man reik tik patikrinti….", 1500),
		createMessage("Operatorius", "Norite pasakyti Jūs esate įgulos narys Dariano laivo, kuris turėjo nugabent krovinį į mėnulį taip?", 1500),
		createMessage("Lorenas", "Tikrai taip.", 7000),
		createMessage("Lorenas", "Mes papuolėme į kažkokią turbulentinę duobę ir dabar nežinau. Mano kajutės durys uždarytos čia beveik nėra šviesos, o per raciją niekas neatsako. ", 7000),
		createMessage("Operatorius", "Sekundėlę.", 1500),
		createMessage("Lorenas", "Atsiprašau bet man atrodo aš jos tikrai dabar neturiu...", 7000),
		createMessage("Operatorius", "Ar galėtumėt primint savo vardą? ", 1500),
		createMessage("Lorenas", "Lorenas… Lorenas mano vardas. ", 7000),
		createMessage("Operatorius", "Lorenai, kas čia pas jūs pypsi? ", 1500),
		createMessage("Lorenas", "Lorenas… Lorenas mano vardas. ", 7000),
		createMessage("Lorenas", "Tai yra mano kostiumo daviklis, kai jis pilnai pakrautas turime 200 valandų, dabar like tik 17 procentų. ", 7000),
		createMessage("Lorenas", "Užduotis skaičiavimo su procentais", 7000),
		createMessage("Operatorius", "Supratau Lorenai, turime tik vieną nedidelį keblumą.", 1500),
        createMessage("Lorenas", "Kokį, būtų įdomu sužinoti? ", 7000),
		createMessage("Operatorius", "Jūsų laivas skaitosi, kaip dingęs jau 7 metus...", 1500),
		createMessage("Lorenas", "Atsiprašau, mano galva dar neatsigavo visiškai, išgirdau, jog 7 metus, Jūs turėjote galvoje 7 valandas, taip operatoriau? ", 7000),
		createMessage("Operatorius", "Ne, dėja aš viską sutikrinau. Dirbu naktinę pamainą ir jau sukvietęs žmonės, kurie galėtu paaškinti situaciją, kuri dabar vyksta.", 1500),
		createMessage("Lorenas", "Septyni metai? Jūs tikriausiai juokaujate man reikia kuo greičiau iš čia ištrūkti…", 7000),
		createMessage("Juregenas", "Lorenai Sveiki, kapitonas Jurgenas.", 1500),
		createMessage("Lorenas", "Kapitone, Jūsų balsas man labai girdėtas, tik dabar negaliu prisimint kur. Apskritai dabar mažai ką prisimenu.", 7000),
		createMessage("Lorenas", "Ar mane dar girdite?", 7000),
		createMessage("Lorenas", "Ką man daryt toliau?", 7000),
		createMessage("Juregenas", "Lorenai negaliu patikėt, kad tai Jūs. Aš buvau jūsų vadas žemėje, kur sudariau komandą iš 4 žmonių ar kiti įgulos nariai kartu su jumis?", 1500),
		createMessage("Lorenas", "Atsiprašau pone. Aš kolkas kajutėje ir negaliu atidaryt durų prašo kodo, jo neatsimenu. Sugebėjau tik prisikviest operatorių per radiją.", 7000),
		createMessage("Juregenas", "Taip, Jūsų įgula turėjo paimti specialą materija, kurį susiformavo mėnylyje, kai mes pastebėjome per teleskopą, bet pakeliui į mėnulį Jūs patekote į juodą skylę, kuri buvo ant tiek maža, jog net rodikliai nepastebėjo.", 1500),
		createMessage("Juregenas", "Šiuo metu mūsų davikliai Tavęs nemato. Būtų gerai, jog išeitum iš kajutęs ir ant kapitono panelęs paspaustum radijo sėkiklį matyt jis išjungtas.", 1500),
		createMessage("Lorenas", "Supratau Kapitone", 7000),
		createMessage("Lorenas", "Prašo kodo, aš jo nelabai pamenu", 7000)
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