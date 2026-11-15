/*
 * Naaah · Earth Jukebox
 * Turns Earth data (temperature, CO₂, sea ice, sea level) into sound and visuals.
 *
 *  1. Translations     5. Chart & globe rendering
 *  2. Datasets         6. Playback
 *  3. State & helpers  7. Panels (info, summary, table)
 *  4. Audio & speech   8. Events & start-up
 */
'use strict';
(() => {

/* ============================== 1. Translations ============================== */
const K='title,home,data,about,set,temp,co2,ice,sea,mt_temp,mt_co2,mt_ice,mt_sea,lg,vs,demo,real,sumb,sumt,tbl,filel,srcw,abt,sett,cap,hap,big,hc,rm,theme,auto,light,dark,year,speed,say,rst,play,pause,prev,next,since,low,mid,high,note,ens,inst,fail,end,e12,e24,e15,e93,lang,hi,askai,aihead,aihi,aiph,aisend,aimic,aistop,aithink,aispeak,aierr,ainomic,ailisten'.split(',');
const L={
uz:'Yer Jukeboxi|Asosiy|Ma’lumot|Haqida|Sozlamalar|Harorat|CO₂|Dengiz muzi|Dengiz sathi|🌿 Yer isiyapti...|☁️ Havoda CO₂ ko‘paymoqda|🧊 Arktika muzi kamaymoqda|🌊 Dengiz sathi ko‘tarilmoqda|Baland ovoz = yuqori qiymat, past ovoz = past qiymat.|ga nisbatan|DEMO (taxminiy)|rasmiy ma’lumot ({a}–{b})|🔊 Xulosani o‘qish|{n}: {a}-yilda {fa}, {b}-yilda {fb}. O‘zgarish {d}. Eng yuqori {my}-yilda ({fmx}), eng past {ny}-yilda ({fmn}).|Jadval ko‘rinishi (ekran o‘qigich uchun)|Rasmiy CSV faylni tanlang:|Rasmiy manba:|Biz Naaah jamoasimiz — Toshkent axborot texnologiyalari universiteti (TATU) talabalarimiz. NASA’ning Yer haqidagi ma’lumotlarini “The Earth Information Jukebox” uchun haqiqatan eshitish va ko‘rish mumkin bo‘lgan narsaga aylantirmoqchimiz. Biz qiziquvchan odamlarni qidiryapmiz: dasturchilar, ma’lumot ishqibozlari, dizaynerlar va hikoyachilar. Hamma narsani bilishingiz shart emas, faqat energiya va g‘oyalaringiz bo‘lsa bas. Vazifalarni aniq taqsimlaymiz, tez-tez bog‘lanib turamiz va do‘stona muhitni saqlaymiz. Bizga qo‘shiling, birgalikda foydali narsa yaratamiz!|Sozlamalar va qulayliklar|Subtitr (ovozning yozma ko‘rinishi)|Tebranish (telefonda)|Katta matn|Yuqori kontrast|Harakatni kamaytirish|Ko‘rinish|Avto|Yorug‘|Qorong‘u|Yil|Tezlik|Ovozli izoh|⟲ Boshidan|Ijro|Pauza|Oldingi yil|Keyingi yil|{y}-yildan beri taxminan {d} o‘zgargan.|past|o‘rta|baland|nota|Hammasi birga|Cholg‘u|Fayl o‘qilmadi. Rasmiy CSV faylni tanlang.|Ijro tugadi.|muz rekord darajada kam bo‘ldi|kuzatuvlar tarixidagi eng issiq yil|yillik o‘rtacha CO₂ birinchi marta 400 ppm dan oshdi|sun’iy yo‘ldosh o‘lchovlari boshlandi|Til|👋 Salom! Keling, Yerning ovozini birga tinglaymiz. Pastdagi ▶ tugmasini bosing.|🎙 AI’dan so‘rang|🤖 Yer yordamchisi|Salom! Men Yer yordamchisiman. Haroratdan dengiz sathigacha istalgan narsani so‘rang: mikrofon tugmasini bosib gapiring yoki yozing.|Savolingizni yozing...|Yuborish|Ovoz bilan so‘rash|To‘xtatish|O‘ylayapman...|Javobni ovozda o‘qish|Hozir javob olib bo‘lmadi. Birozdan keyin yana urinib ko‘ring.|Bu qurilmada ovozli kiritish ishlamayapti. Savolingizni yozing.|Tinglayapman... gapiring'.split('|'),
en:'Earth Jukebox|Home|Data|About|Settings|Temperature|CO₂|Sea ice|Sea level|🌿 The Earth is warming...|☁️ CO₂ is rising in the air|🧊 Arctic ice is shrinking|🌊 Sea level is rising|Higher pitch = higher value, lower pitch = lower value.|vs|DEMO (approximate)|official data ({a}–{b})|🔊 Read summary|{n}: {fa} in {a}, {fb} in {b}. Change {d}. Highest {fmx} in {my}, lowest {fmn} in {ny}.|Table view (for screen readers)|Choose the official CSV file:|Official source:|We’re Team Naaah, students from Tashkent University of Information and Technologies (TUIT), who want to turn NASA Earth data into something you can actually hear and see for The Earth Information Jukebox. We’re looking for curious people: coders, data fans, designers, and storytellers. You don’t need to know everything, just bring energy and ideas. We split tasks clearly, check in often, and keep it friendly. Join us and let’s build something useful!|Settings and accessibility|Captions (text version of the sound)|Vibration (on phones)|Large text|High contrast|Reduce motion|Appearance|Auto|Light|Dark|Year|Speed|Spoken notes|⟲ Restart|Play|Pause|Previous year|Next year|About {d} change since {y}.|low|medium|high|note|All together|Instrument|Could not read the file. Choose the official CSV file.|Playback finished.|sea ice hit a record low|the hottest year on record|annual mean CO₂ passed 400 ppm for the first time|satellite measurements began|Language|👋 Hi there! Let’s listen to the Earth together. Press ▶ below.|🎙 Ask the AI|🤖 Earth assistant|Hi! I’m the Earth assistant. Ask me anything, from temperature to sea level: tap the microphone and speak, or type.|Type your question...|Send|Ask by voice|Stop|Thinking...|Read answers aloud|Sorry, I couldn’t get an answer right now. Please try again in a moment.|Voice input isn’t available on this device. Please type your question.|Listening... go ahead and speak'.split('|'),
ru:'Земной джукбокс|Главная|Данные|О проекте|Настройки|Температура|CO₂|Морской лёд|Уровень моря|🌿 Земля нагревается...|☁️ CO₂ в воздухе растёт|🧊 Арктический лёд тает|🌊 Уровень моря растёт|Чем выше звук, тем больше значение.|относительно|ДЕМО (приблизительно)|официальные данные ({a}–{b})|🔊 Прочитать итог|{n}: {fa} в {a} году, {fb} в {b} году. Изменение {d}. Максимум {fmx} в {my} году, минимум {fmn} в {ny} году.|Таблица (для программ чтения с экрана)|Выберите официальный CSV-файл:|Официальный источник:|Мы команда Naaah — студенты Ташкентского университета информационных технологий (ТУИТ), и мы хотим превратить данные NASA о Земле в то, что можно по-настоящему услышать и увидеть, для задачи «The Earth Information Jukebox». Мы ищем любознательных людей: программистов, любителей данных, дизайнеров и рассказчиков. Знать всё не обязательно — принесите энергию и идеи. Мы чётко распределяем задачи, часто созваниваемся и сохраняем дружескую атмосферу. Присоединяйтесь — создадим что-то полезное!|Настройки и доступность|Субтитры (текст звука)|Вибрация (на телефоне)|Крупный текст|Высокий контраст|Меньше анимации|Тема|Авто|Светлая|Тёмная|Год|Скорость|Голосовые подсказки|⟲ Сначала|Играть|Пауза|Предыдущий год|Следующий год|С {y} года изменение примерно {d}.|низкий|средний|высокий|нота|Всё вместе|Инструмент|Не удалось прочитать файл. Выберите официальный CSV-файл.|Воспроизведение завершено.|лёд достиг рекордного минимума|самый тёплый год за всю историю наблюдений|среднегодовой CO₂ впервые превысил 400 ppm|начались спутниковые измерения|Язык|👋 Привет! Давайте вместе послушаем Землю. Нажмите ▶ внизу.|🎙 Спросить ИИ|🤖 Помощник по Земле|Привет! Я помощник по Земле. Спрашивайте о чём угодно, от температуры до уровня моря: нажмите на микрофон и говорите или напишите.|Напишите свой вопрос...|Отправить|Спросить голосом|Остановить|Думаю...|Читать ответы вслух|Не удалось получить ответ. Попробуйте ещё раз чуть позже.|Голосовой ввод на этом устройстве недоступен. Напишите вопрос.|Слушаю... говорите'.split('|'),
zh:'地球点唱机|首页|数据|关于|设置|气温|二氧化碳|海冰|海平面|🌿 地球正在变暖...|☁️ 空气中的二氧化碳在增加|🧊 北极海冰正在减少|🌊 海平面正在上升|音调越高，数值越大。|相对于|演示数据（近似）|官方数据（{a}–{b}）|🔊 朗读摘要|{n}：{a}年为{fa}，{b}年为{fb}。变化{d}。最高值为{my}年的{fmx}，最低值为{ny}年的{fmn}。|表格视图（供读屏软件使用）|请选择官方 CSV 文件：|官方来源：|我们是 Naaah 团队，成员来自塔什干信息技术大学（TUIT）。我们希望为“地球信息点唱机”挑战，把 NASA 的地球数据变成真正能听见、看见的作品。我们在寻找充满好奇心的伙伴：程序员、数据爱好者、设计师和讲故事的人。你不需要什么都懂，只要带来热情和想法。我们分工明确，经常沟通，氛围友好。加入我们，一起做点有用的东西吧！|设置与无障碍|字幕（声音的文字说明）|振动（手机）|大字体|高对比度|减少动画|外观|自动|浅色|深色|年份|速度|语音播报|⟲ 重新开始|播放|暂停|上一年|下一年|自{y}年以来变化约{d}。|低|中|高|音符|合奏|乐器|无法读取文件。请选择官方 CSV 文件。|播放结束。|海冰降至历史最低|有记录以来最热的一年|年均二氧化碳首次超过 400 ppm|卫星测量开始|语言|👋 你好！一起来聆听地球的声音吧。点击下方的 ▶。|🎙 问 AI|🤖 地球助手|你好！我是地球助手。从气温到海平面，什么都可以问我：点击麦克风说话，或直接输入。|输入你的问题...|发送|语音提问|停止|思考中...|朗读回答|抱歉，暂时无法回答。请稍后再试。|此设备不支持语音输入，请输入问题。|正在聆听... 请说话'.split('|'),
hi:'अर्थ जूकबॉक्स|होम|डेटा|परिचय|सेटिंग्स|तापमान|CO₂|समुद्री बर्फ़|समुद्र स्तर|🌿 धरती गर्म हो रही है...|☁️ हवा में CO₂ बढ़ रहा है|🧊 आर्कटिक की बर्फ़ घट रही है|🌊 समुद्र का स्तर बढ़ रहा है|ऊँचा स्वर = ऊँचा मान, नीचा स्वर = नीचा मान।|की तुलना में|डेमो (अनुमानित)|आधिकारिक डेटा ({a}–{b})|🔊 सारांश सुनें|{n}: {a} में {fa}, {b} में {fb}। बदलाव {d}। सबसे ऊँचा {my} में ({fmx}), सबसे नीचा {ny} में ({fmn})।|तालिका दृश्य (स्क्रीन रीडर के लिए)|आधिकारिक CSV फ़ाइल चुनें:|आधिकारिक स्रोत:|हम टीम Naaah हैं, ताशकंद सूचना प्रौद्योगिकी विश्वविद्यालय (TUIT) के छात्र। हम “The Earth Information Jukebox” के लिए NASA के पृथ्वी डेटा को ऐसी चीज़ में बदलना चाहते हैं जिसे आप सच में सुन और देख सकें। हम जिज्ञासु लोगों की तलाश में हैं: कोडर, डेटा के शौकीन, डिज़ाइनर और कहानीकार। आपको सब कुछ आना ज़रूरी नहीं, बस ऊर्जा और विचार साथ लाइए। हम काम साफ़ बाँटते हैं, अक्सर एक-दूसरे से बात करते हैं और माहौल दोस्ताना रखते हैं। हमसे जुड़िए और मिलकर कुछ उपयोगी बनाएँ!|सेटिंग्स और सुगम्यता|उपशीर्षक (ध्वनि का लिखित रूप)|कंपन (फ़ोन पर)|बड़ा टेक्स्ट|उच्च कंट्रास्ट|कम एनिमेशन|थीम|ऑटो|हल्का|गहरा|वर्ष|गति|बोलकर बताएँ|⟲ फिर से शुरू|चलाएँ|रोकें|पिछला वर्ष|अगला वर्ष|{y} से अब तक लगभग {d} का बदलाव।|निम्न|मध्यम|उच्च|स्वर|सब एक साथ|वाद्य|फ़ाइल नहीं पढ़ी जा सकी। आधिकारिक CSV फ़ाइल चुनें।|प्लेबैक पूरा हुआ।|समुद्री बर्फ़ रिकॉर्ड न्यूनतम पर पहुँची|अब तक का सबसे गर्म वर्ष|वार्षिक औसत CO₂ पहली बार 400 ppm से ऊपर गया|उपग्रह माप शुरू हुए|भाषा|👋 नमस्ते! आइए मिलकर धरती की आवाज़ सुनें। नीचे ▶ दबाइए।|🎙 AI से पूछें|🤖 पृथ्वी सहायक|नमस्ते! मैं पृथ्वी सहायक हूँ। तापमान से लेकर समुद्र स्तर तक कुछ भी पूछिए: माइक्रोफ़ोन दबाकर बोलिए या लिखिए।|अपना सवाल लिखें...|भेजें|आवाज़ से पूछें|रोकें|सोच रहा हूँ...|जवाब बोलकर सुनाएँ|माफ़ कीजिए, अभी जवाब नहीं मिल सका। कृपया थोड़ी देर बाद फिर कोशिश करें।|इस डिवाइस पर वॉइस इनपुट उपलब्ध नहीं है। कृपया सवाल लिखें।|सुन रहा हूँ... बोलिए'.split('|'),
es:'Jukebox de la Tierra|Inicio|Datos|Acerca de|Ajustes|Temperatura|CO₂|Hielo marino|Nivel del mar|🌿 La Tierra se calienta...|☁️ El CO₂ aumenta en el aire|🧊 El hielo del Ártico disminuye|🌊 El nivel del mar sube|Tono más alto = valor más alto; tono más bajo = valor más bajo.|respecto a|DEMO (aproximado)|datos oficiales ({a}–{b})|🔊 Leer resumen|{n}: {fa} en {a}, {fb} en {b}. Cambio {d}. Máximo {fmx} en {my}, mínimo {fmn} en {ny}.|Vista de tabla (para lectores de pantalla)|Elige el archivo CSV oficial:|Fuente oficial:|Somos el equipo Naaah, estudiantes de la Universidad de Tecnologías de la Información de Tashkent (TUIT), y queremos convertir los datos terrestres de la NASA en algo que realmente se pueda oír y ver para The Earth Information Jukebox. Buscamos personas curiosas: programadores, aficionados a los datos, diseñadores y narradores. No necesitas saberlo todo, solo trae energía e ideas. Repartimos las tareas con claridad, hablamos a menudo y mantenemos un ambiente amigable. ¡Únete y construyamos algo útil!|Ajustes y accesibilidad|Subtítulos (texto del sonido)|Vibración (en móviles)|Texto grande|Alto contraste|Reducir movimiento|Apariencia|Auto|Claro|Oscuro|Año|Velocidad|Voz|⟲ Reiniciar|Reproducir|Pausa|Año anterior|Año siguiente|Desde {y} el cambio es de unos {d}.|bajo|medio|alto|nota|Todo junto|Instrumento|No se pudo leer el archivo. Elige el CSV oficial.|Reproducción terminada.|el hielo marino llegó a un mínimo histórico|el año más cálido registrado|el CO₂ medio anual superó por primera vez los 400 ppm|comenzaron las mediciones por satélite|Idioma|👋 ¡Hola! Escuchemos juntos a la Tierra. Pulsa ▶ abajo.|🎙 Pregunta a la IA|🤖 Asistente de la Tierra|¡Hola! Soy el asistente de la Tierra. Pregúntame lo que quieras, de la temperatura al nivel del mar: toca el micrófono y habla, o escribe.|Escribe tu pregunta...|Enviar|Preguntar por voz|Detener|Pensando...|Leer las respuestas en voz alta|Lo siento, ahora no pude obtener una respuesta. Inténtalo de nuevo en un momento.|La entrada de voz no está disponible en este dispositivo. Escribe tu pregunta.|Escuchando... habla ahora'.split('|'),
ar:'جوك بوكس الأرض|الرئيسية|البيانات|حول|الإعدادات|الحرارة|ثاني أكسيد الكربون|الجليد البحري|مستوى سطح البحر|🌿 الأرض تزداد حرارة...|☁️ ثاني أكسيد الكربون يزداد في الهواء|🧊 جليد القطب الشمالي يتناقص|🌊 مستوى سطح البحر يرتفع|النغمة الأعلى = قيمة أعلى، والنغمة الأخفض = قيمة أقل.|مقارنة بـ|تجريبي (تقريبي)|بيانات رسمية ({a}–{b})|🔊 اقرأ الملخص|{n}: {fa} في {a}، و{fb} في {b}. التغير {d}. الأعلى {fmx} في {my}، والأدنى {fmn} في {ny}.|عرض الجدول (لقارئات الشاشة)|اختر ملف CSV الرسمي:|المصدر الرسمي:|نحن فريق Naaah، طلاب من جامعة طشقند لتكنولوجيا المعلومات (TUIT)، ونريد تحويل بيانات ناسا عن الأرض إلى شيء يمكنك سماعه ورؤيته فعلًا في تحدي «The Earth Information Jukebox». نبحث عن أشخاص فضوليين: مبرمجين وعشاق بيانات ومصممين ورواة قصص. لا تحتاج إلى معرفة كل شيء، يكفي أن تجلب الحماس والأفكار. نوزّع المهام بوضوح ونتواصل باستمرار ونحافظ على أجواء ودّية. انضم إلينا لنبنِ شيئًا مفيدًا!|الإعدادات وإمكانية الوصول|ترجمة نصية (وصف الصوت)|اهتزاز (على الهاتف)|نص كبير|تباين عالٍ|تقليل الحركة|المظهر|تلقائي|فاتح|داكن|السنة|السرعة|تعليق صوتي|⟲ من البداية|تشغيل|إيقاف مؤقت|السنة السابقة|السنة التالية|منذ {y} تغيّر بنحو {d}.|منخفض|متوسط|مرتفع|نغمة|الكل معًا|الآلة|تعذرت قراءة الملف. اختر ملف CSV الرسمي.|انتهى التشغيل.|وصل الجليد البحري إلى أدنى مستوى قياسي|أحر سنة في السجلات|تجاوز متوسط ثاني أكسيد الكربون السنوي 400 جزء في المليون لأول مرة|بدأت القياسات بالأقمار الصناعية|اللغة|👋 مرحبًا! لنستمع إلى الأرض معًا. اضغط ▶ بالأسفل.|🎙 اسأل الذكاء الاصطناعي|🤖 مساعد الأرض|مرحبًا! أنا مساعد الأرض. اسألني عن أي شيء، من الحرارة إلى مستوى سطح البحر: اضغط على الميكروفون وتحدث، أو اكتب.|اكتب سؤالك...|إرسال|اسأل بالصوت|إيقاف|أفكر...|قراءة الإجابات بصوت عالٍ|عذرًا، تعذّر الحصول على إجابة الآن. حاول مرة أخرى بعد قليل.|الإدخال الصوتي غير متاح على هذا الجهاز. اكتب سؤالك.|أستمع... تفضل بالكلام'.split('|'),
fr:'Jukebox de la Terre|Accueil|Données|À propos|Réglages|Température|CO₂|Glace de mer|Niveau de la mer|🌿 La Terre se réchauffe...|☁️ Le CO₂ augmente dans l’air|🧊 La glace arctique diminue|🌊 Le niveau de la mer monte|Son plus aigu = valeur plus élevée ; son plus grave = valeur plus faible.|par rapport à|DÉMO (approximatif)|données officielles ({a}–{b})|🔊 Lire le résumé|{n} : {fa} en {a}, {fb} en {b}. Variation {d}. Maximum {fmx} en {my}, minimum {fmn} en {ny}.|Vue en tableau (pour lecteurs d’écran)|Choisissez le fichier CSV officiel :|Source officielle :|Nous sommes l’équipe Naaah, des étudiants de l’Université des technologies de l’information de Tachkent (TUIT), et nous voulons transformer les données terrestres de la NASA en quelque chose que l’on peut vraiment entendre et voir pour The Earth Information Jukebox. Nous cherchons des personnes curieuses : développeurs, passionnés de données, designers et conteurs. Pas besoin de tout savoir, apportez simplement de l’énergie et des idées. Nous répartissons clairement les tâches, nous échangeons souvent et nous gardons une ambiance conviviale. Rejoignez-nous et construisons quelque chose d’utile !|Réglages et accessibilité|Sous-titres (texte du son)|Vibration (sur mobile)|Grand texte|Contraste élevé|Réduire les animations|Apparence|Auto|Clair|Sombre|Année|Vitesse|Voix|⟲ Recommencer|Lecture|Pause|Année précédente|Année suivante|Depuis {y}, variation d’environ {d}.|grave|moyen|aigu|note|Tous ensemble|Instrument|Impossible de lire le fichier. Choisissez le CSV officiel.|Lecture terminée.|la glace de mer a atteint un minimum record|l’année la plus chaude jamais enregistrée|le CO₂ moyen annuel a dépassé 400 ppm pour la première fois|les mesures par satellite ont commencé|Langue|👋 Salut ! Écoutons la Terre ensemble. Appuyez sur ▶ en bas.|🎙 Demander à l’IA|🤖 Assistant de la Terre|Salut ! Je suis l’assistant de la Terre. Posez-moi n’importe quelle question, de la température au niveau de la mer : touchez le micro et parlez, ou écrivez.|Écrivez votre question...|Envoyer|Poser la question à voix haute|Arrêter|Je réfléchis...|Lire les réponses à voix haute|Désolé, je n’ai pas pu répondre pour le moment. Réessayez dans un instant.|La saisie vocale n’est pas disponible sur cet appareil. Écrivez votre question.|J’écoute... parlez'.split('|')
};

const SPEECH_LANG = {
  uz: 'uz-UZ', en: 'en-US', ru: 'ru-RU', zh: 'zh-CN',
  hi: 'hi-IN', es: 'es-ES', ar: 'ar-SA', fr: 'fr-FR',
};

/* ================================ 2. Datasets ================================ */

/** Linear interpolation between [year, value] anchor points, one entry per year. */
function interpolate(anchors, fromYear, toYear) {
  const points = [];
  for (let year = fromYear; year <= toYear; year++) {
    let i = 0;
    while (anchors[i + 1][0] < year) i++;
    const [y0, v0] = anchors[i];
    const [y1, v1] = anchors[i + 1];
    points.push({ y: year, v: v0 + ((v1 - v0) * (year - y0)) / (y1 - y0) });
  }
  return points;
}

// Official values, embedded so the app works offline. Everyone can still replace them in the Data tab.
const fromYear = (first, values) => values.map((v, i) => ({ y: first + i, v }));
const OFFICIAL_TEMPERATURE = fromYear(1880, [-0.1725,-0.0875,-0.1117,-0.1758,-0.2825,-0.3333,-0.3133,-0.3617,-0.1767,-0.1075,-0.355,-0.2242,-0.2725,-0.3117,-0.3033,-0.2267,-0.1117,-0.1108,-0.275,-0.1775,-0.0842,-0.155,-0.2825,-0.3708,-0.4725,-0.2583,-0.2175,-0.3808,-0.4225,-0.4825,-0.4342,-0.4425,-0.3658,-0.3425,-0.1542,-0.1383,-0.36,-0.4575,-0.2967,-0.2742,-0.2683,-0.1833,-0.2825,-0.2625,-0.2683,-0.2183,-0.105,-0.2142,-0.1983,-0.36,-0.1533,-0.0892,-0.1575,-0.2842,-0.1283,-0.2,-0.15,-0.0308,-0.0025,-0.0208,0.1217,0.1808,0.0633,0.0867,0.2025,0.0942,-0.0708,-0.0275,-0.1075,-0.1108,-0.175,-0.0708,0.01,0.0817,-0.1333,-0.14,-0.1892,0.0475,0.0608,0.0308,-0.025,0.0567,0.0308,0.0533,-0.2,-0.1083,-0.0567,-0.0233,-0.0833,0.0525,0.0275,-0.08,0.0092,0.1608,-0.0717,-0.0125,-0.0967,0.1775,0.0667,0.1642,0.2567,0.3225,0.1392,0.315,0.155,0.1183,0.18,0.3217,0.3883,0.2725,0.4483,0.4058,0.2225,0.2308,0.3133,0.445,0.3333,0.465,0.6083,0.3825,0.3933,0.5333,0.6283,0.6158,0.5342,0.6783,0.6425,0.665,0.5425,0.6567,0.7225,0.6075,0.6458,0.6742,0.7467,0.895,1.01,0.9125,0.8483,0.9775,1.005,0.8475,0.89,1.1675,1.2817,1.185]); // NASA GISTEMP v4, annual J–D mean
const OFFICIAL_CO2 = fromYear(1959, [315.98,316.91,317.64,318.45,318.99,319.62,320.04,321.37,322.18,323.05,324.62,325.68,326.32,327.46,329.68,330.19,331.13,332.03,333.84,335.41,336.84,338.76,340.12,341.48,343.15,344.87,346.35,347.61,349.31,351.69,353.2,354.45,355.7,356.54,357.21,358.96,360.97,362.74,363.88,366.84,368.54,369.71,371.32,373.45,375.98,377.7,379.98,382.09,384.02,385.83,387.64,390.1,391.85,394.06,396.74,398.81,401.01,404.41,406.76,408.72,411.65,414.21,416.41,418.53,421.08,424.61,427.35]);          // NOAA GML, Mauna Loa annual mean
const OFFICIAL_ICE = fromYear(1979, [7.05,7.67,7.14,7.3,7.39,6.81,6.7,7.41,7.28,7.37,7.01,6.14,6.47,7.47,6.4,7.14,6.08,7.58,6.69,6.54,6.12,6.25,6.73,5.83,6.12,5.98,5.5,5.86,4.27,4.69,5.26,4.87,4.56,3.57,5.21,5.22,4.62,4.53,4.82,4.79,4.32]);          // NSIDC Sea Ice Index, September Arctic extent
const OFFICIAL_SEA_LEVEL = fromYear(1993, [0.0,4.5,12.1,13.7,18.0,14.9,20.4,20.8,27.0,22.4,27.2,27.9,29.2,34.2,32.7,41.4,47.6,56.6,56.9,63.4,64.2,71.3,72.2,78.4,77.4,74.2,84.0]);    // UHSLC / NOAA Climate.gov, annual mean vs 1993

const SERIES = ['temp', 'co2', 'ice', 'sea'];

const datasets = {
  temp: { icon: '🌡', unit: '°C', decimals: 2, signed: true, color: '#ff7a45', baseline: '1951–1980',
          data: OFFICIAL_TEMPERATURE, official: true,
          source: 'NASA GISTEMP v4 · data.giss.nasa.gov/gistemp · global land-ocean annual mean (J–D), 1880–2025' },
  co2:  { icon: '☁️', unit: ' ppm', decimals: 1, signed: false, color: '#a98bff',
          data: OFFICIAL_CO2, official: true,
          source: 'NOAA GML · gml.noaa.gov/ccgg/trends · Mauna Loa annual mean CO₂, 1959–2025' },
  ice:  { icon: '🧊', unit: ' M km²', decimals: 2, signed: false, color: '#2cc4f0',
          data: OFFICIAL_ICE, official: true,
          source: 'NSIDC Sea Ice Index · nsidc.org/data/seaice_index · September Arctic extent, 1979–2019 (load the NSIDC CSV below for 2020+)' },
  sea:  { icon: '🌊', unit: ' mm', decimals: 0, signed: true, color: '#3d8bff', baseline: '1993',
          data: OFFICIAL_SEA_LEVEL, official: true,
          source: 'Global mean sea level, annual mean relative to 1993 · UHSLC Fast Delivery via NOAA Climate.gov dashboard, 1993–2019 (load NASA GMSL CSV below for newer years)' },
  ens:  { icon: '🎼', color: '#12d68a', data: [], official: false },
};

// Keep a copy of the built-in values so "Restore official data" always works.
SERIES.forEach((k) => {
  const d = datasets[k];
  d.builtin = { data: d.data, unit: d.unit, decimals: d.decimals, signed: d.signed };
});

// Notable years shown (and spoken) while the data plays.
const MILESTONES = {
  temp: { 2024: 'e24' }, co2: { 2015: 'e15' }, ice: { 2012: 'e12' }, sea: { 1993: 'e93' },
};

/** Builds the ensemble timeline: the years all four datasets share, each value scaled to 0–1. */
function buildEnsemble() {
  const firstYear = Math.max(...SERIES.map((k) => datasets[k].data[0].y));
  const lastYear = Math.min(...SERIES.map((k) => datasets[k].data.at(-1).y));
  const lookups = SERIES.map((k) => new Map(datasets[k].data.map((p) => [p.y, p.v])));
  const ranges = lookups.map((map) => {
    const values = [...map.entries()].filter(([y]) => y >= firstYear && y <= lastYear).map(([, v]) => v);
    return [Math.min(...values), Math.max(...values)];
  });

  const timeline = [];
  for (let year = firstYear; year <= lastYear; year++) {
    const raw = lookups.map((map) => map.get(year));
    if (raw.some((v) => v === undefined)) continue;
    const scaled = raw.map((v, i) => (v - ranges[i][0]) / (ranges[i][1] - ranges[i][0] || 1));
    timeline.push({ y: year, v: 0, a: raw, t: scaled });
  }
  datasets.ens.data = timeline;
}

/** Reads an official CSV. Handles the GISTEMP table, NSIDC monthly rows and plain "year,value" files. */
function parseCsv(text, key) {
  const points = [];
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith('#')) continue;
    const cols = line.split(',').map((c) => c.trim());
    if (!/^\d{4}$/.test(cols[0])) continue;

    let value;
    if (key === 'temp' && cols.length > 13) value = parseFloat(cols[13]);          // GISTEMP: J–D column
    else if (cols.length >= 5 && /^\d{1,2}$/.test(cols[1]) && +cols[1] <= 12) value = parseFloat(cols[4]); // NSIDC
    else value = parseFloat(cols[1]);

    if (!Number.isNaN(value) && value > -900) points.push({ y: +cols[0], v: value });
  }
  return points;
}

/* ============================ 3. State & helpers ============================ */

const state = { dataset: 'temp', index: 0, lang: 'uz', timer: null, audio: null };

const $ = (id) => document.getElementById(id);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const root = document.documentElement;

const t = (key) => L[state.lang][K.indexOf(key)];
const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, name) => values[name]);
const cssVar = (name) => getComputedStyle(root).getPropertyValue(name).trim();

const isEnsemble = () => state.dataset === 'ens';
const series = () => datasets[state.dataset].data;
const current = () => series()[state.index];
const announce = (text) => { $('live').textContent = text; };

function formatValue(key, value, forceSign = false) {
  const ds = datasets[key];
  const sign = (forceSign || ds.signed) && value >= 0 ? '+' : '';
  return sign + value.toFixed(ds.decimals) + ds.unit;
}
const format = (value, forceSign) => formatValue(state.dataset, value, forceSign);

/** [min, max] of the active series (always 0–1 for the ensemble). */
function valueRange() {
  if (isEnsemble()) return [0, 1];
  const values = series().map((p) => p.v);
  return [Math.min(...values), Math.max(...values)];
}
function levelOf(value) {
  const [min, max] = valueRange();
  return (value - min) / (max - min || 1);
}
const ensembleValues = (point) => SERIES.map((k, i) => `${datasets[k].icon} ${formatValue(k, point.a[i])}`).join(' · ');
const trendArrow = (now, before) => (before === undefined ? '' : now > before ? '↑' : now < before ? '↓' : '→');

/* ============================ 4. Audio & speech ============================= */

const INSTRUMENTS = {
  piano:   { wave: 'triangle', partials: [[1, 1], [2, 0.3], [3, 0.1]], decay: 0.9 },
  marimba: { wave: 'sine',     partials: [[1, 1], [4, 0.3]], decay: 0.35 },
  synth:   { wave: 'sawtooth', partials: [[1, 0.5]], decay: 0.5, lowpass: 1800 },
  bell:    { wave: 'sine',     partials: [[1, 1], [2.76, 0.5], [5.4, 0.25]], decay: 1.2 },
  organ:   { wave: 'sine',     partials: [[1, 1], [2, 0.5], [3, 0.3]], decay: 0.5 },
};
// Ensemble: one voice per dataset, in the same order as SERIES.
const ENSEMBLE_VOICES = [
  { instrument: 'piano', base: 60, span: 9 }, { instrument: 'organ', base: 36, span: 9 },
  { instrument: 'bell', base: 72, span: 7 },  { instrument: 'marimba', base: 48, span: 9 },
];
const PENTATONIC = [0, 2, 4, 7, 9];

/** Maps a 0–1 level onto a pentatonic scale, so any sequence of values sounds pleasant. */
function pitchFor(level, baseMidi, span) {
  const step = Math.round(level * span);
  const midi = baseMidi + 12 * Math.floor(step / 5) + PENTATONIC[step % 5];
  return 440 * 2 ** ((midi - 69) / 12);
}

function playTone(frequency, instrumentName, volume) {
  state.audio ??= new (window.AudioContext || window.webkitAudioContext)();
  const ctx = state.audio;
  const { wave, partials, decay, lowpass } = INSTRUMENTS[instrumentName];
  const now = ctx.currentTime;

  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(0, now);
  envelope.gain.linearRampToValueAtTime(volume, now + 0.015);
  envelope.gain.exponentialRampToValueAtTime(0.001, now + decay);

  if (lowpass) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = lowpass;
    envelope.connect(filter).connect(ctx.destination);
  } else {
    envelope.connect(ctx.destination);
  }

  for (const [multiple, level] of partials) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.value = frequency * multiple;
    gain.gain.value = level;
    osc.connect(gain).connect(envelope);
    osc.start(now);
    osc.stop(now + decay + 0.05);
  }
}

/** Plays the note(s) for the current year, pulses the globe and (optionally) vibrates the phone. */
function playCurrentNote() {
  const point = current();
  let level;
  if (isEnsemble()) {
    ENSEMBLE_VOICES.forEach((voice, i) => playTone(pitchFor(point.t[i], voice.base, voice.span), voice.instrument, 0.15));
    level = point.t.reduce((sum, v) => sum + v, 0) / point.t.length;
  } else {
    level = levelOf(point.v);
    playTone(pitchFor(level, 48, 14), $('insel').value, 0.22);
  }
  const globe = $('globe');
  globe.classList.add('p');
  setTimeout(() => globe.classList.remove('p'), 150);
  if ($('hap').checked && navigator.vibrate) navigator.vibrate(15 + Math.round(level * 70));
}

function speak(text) {
  announce(text);
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG[state.lang];
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

/** While playing, reads out one value every 10–20 years (5 in ensemble mode). */
function speakDecade() {
  if (!$('say').checked) return;
  const point = current();
  if (isEnsemble()) {
    if (point.y % 5 === 0) speak(`${point.y}: ${ensembleValues(point).replaceAll(' · ', ', ')}`);
  } else if (point.y % (series().length > 70 ? 20 : 10) === 0) {
    speak(`${point.y}: ${format(point.v)}`);
  }
}

/* ======================= 5. Chart & globe rendering ========================= */

const niceStep = (span) => [0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 20, 50].find((s) => span / s <= 5) ?? 50;

function drawChart() {
  const canvas = $('c');
  const points = series();
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !points.length) return;

  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.clearRect(0, 0, width, height);

  const ensemble = isEnsemble();
  const [min, max] = valueRange();
  const step = ensemble ? 0.5 : niceStep(max - min || 1);
  const lo = ensemble ? 0 : Math.floor(min / step) * step;
  const hi = ensemble ? 1 : Math.ceil(max / step) * step;
  const pad = { left: ensemble ? 14 : 44, right: 10, top: 8, bottom: 22 };
  const geometry = {
    ctx, width, height, points, step, lo, hi, pad,
    last: Math.min(state.index, points.length - 1),
    x: (i) => pad.left + ((width - pad.left - pad.right) * i) / (points.length - 1),
    y: (v) => height - pad.bottom - ((height - pad.bottom - pad.top) * (v - lo)) / (hi - lo),
  };

  ctx.font = `${root.classList.contains('big') ? 14 : 11}px system-ui,sans-serif`;
  drawGrid(geometry, ensemble);
  if (ensemble) drawEnsembleLines(geometry);
  else drawSingleLine(geometry);
}

function drawGrid({ ctx, width, points, step, lo, hi, pad, x, y, height }, ensemble) {
  ctx.fillStyle = cssVar('--muted');
  ctx.strokeStyle = cssVar('--border');
  ctx.lineWidth = 1;
  for (let v = lo; v <= hi + step / 100; v += step) {
    ctx.beginPath();
    ctx.moveTo(pad.left, y(v));
    ctx.lineTo(width - pad.right, y(v));
    ctx.stroke();
    if (!ensemble) ctx.fillText(v.toFixed(step < 0.1 ? 2 : step < 1 ? 1 : 0), 2, y(v) + 4);
  }
  const yearStep = points.length > 100 ? 20 : points.length > 50 ? 10 : 5;
  points.forEach((p, i) => { if (p.y % yearStep === 0) ctx.fillText(String(p.y), x(i) - 12, height - 6); });
}

function drawSingleLine({ ctx, width, points, lo, last, x, y }) {
  const color = datasets[state.dataset].color;
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, cssVar('--accent'));

  ctx.beginPath();
  for (let i = 0; i <= last; i++) {
    if (i === 0) ctx.moveTo(x(i), y(points[i].v));
    else ctx.lineTo(x(i), y(points[i].v));
  }
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Soft fill under the line, then the "you are here" dot.
  ctx.lineTo(x(last), y(lo));
  ctx.lineTo(x(0), y(lo));
  ctx.closePath();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x(last), y(points[last].v), 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawEnsembleLines({ ctx, points, last, x, y, pad, height }) {
  const dashes = [[], [6, 3], [2, 3], [8, 3, 2, 3]]; // different line styles help colour-blind users
  SERIES.forEach((key, s) => {
    const color = datasets[key].color;
    ctx.beginPath();
    ctx.setLineDash(dashes[s]);
    for (let i = 0; i <= last; i++) {
      if (i === 0) ctx.moveTo(x(i), y(points[i].t[s]));
      else ctx.lineTo(x(i), y(points[i].t[s]));
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x(last), y(points[last].t[s]), 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.strokeStyle = cssVar('--muted');
  ctx.beginPath();
  ctx.moveTo(x(last), pad.top);
  ctx.lineTo(x(last), height - pad.bottom);
  ctx.stroke();
}

/** The globe shows the data: warmer, hazier, less ice, higher seas. Values are 0–1 levels. */
function setGlobeEffects({ heat, haze, ice, sea }) {
  $('heat').setAttribute('opacity', (heat * 0.5).toFixed(2));
  $('haze').setAttribute('opacity', (haze * 0.55).toFixed(2));
  $('pcap').setAttribute('rx', (14 + ice * 50).toFixed(1));
  $('pcap').setAttribute('ry', (5 + ice * 14).toFixed(1));
  $('sl').setAttribute('r', (86 + (sea ?? 0) * 9).toFixed(1));
  $('sl').setAttribute('opacity', sea === null ? 0 : 0.9);
}

function renderGlobe() {
  const point = current();
  if (isEnsemble()) {
    const [heat, haze, ice, sea] = point.t;
    setGlobeEffects({ heat, haze, ice, sea });
  } else {
    const level = levelOf(point.v);
    const key = state.dataset;
    setGlobeEffects({
      heat: key === 'temp' ? level : 0,
      haze: key === 'co2' ? level : 0,
      ice: key === 'ice' ? level : 0.25,
      sea: key === 'sea' ? level : null,
    });
  }
}

function renderMilestone() {
  const point = current();
  const keys = isEnsemble() ? SERIES : [state.dataset];
  const notes = keys.filter((k) => MILESTONES[k]?.[point.y]).map((k) => t(MILESTONES[k][point.y]));
  const text = notes.join(' · ');
  $('ev').textContent = text ? `⭐ ${point.y}: ${text}` : '';
  if (text && state.timer && $('say').checked) speak(`${point.y}: ${text}`);
}

function renderReadout() {
  const point = current();
  $('py').textContent = `${t('year')}: ${point.y}`;

  if (isEnsemble()) {
    $('pv').textContent = '🎼 ×4';
    $('tv').textContent = point.y;
    $('tk').textContent = '';
    $('df').textContent = ensembleValues(point);
    $('c').setAttribute('aria-label', `${t('ens')} ${point.y}: ${SERIES.map((k, i) => `${t(k)} ${formatValue(k, point.a[i])}`).join(', ')}`);
    return;
  }
  const ds = datasets[state.dataset];
  const first = series()[0];
  $('pv').textContent = format(point.v);
  $('tv').textContent = format(point.v);
  $('tk').textContent = point.y + (ds.baseline ? ` · ${t('vs')} ${ds.baseline}` : '');
  $('df').textContent = fill(t('since'), { y: first.y, d: format(point.v - first.v, true) });
  $('c').setAttribute('aria-label', `${t(state.dataset)}, ${first.y}–${series().at(-1).y}. ${point.y}: ${format(point.v)}`);
}

function renderCaption() {
  if (!$('cap_t').checked) { $('cap').textContent = ''; return; }
  const point = current();
  const before = series()[state.index - 1];
  let text;
  if (isEnsemble()) {
    text = SERIES.map((k, i) => datasets[k].icon + trendArrow(point.a[i], before?.a[i])).join(' ');
  } else {
    const level = levelOf(point.v);
    const word = level < 0.33 ? t('low') : level < 0.66 ? t('mid') : t('high');
    text = `${word} · ${t('note')} ${trendArrow(point.v, before?.v)}`.trim();
  }
  $('cap').textContent = `♪ ${point.y} · ${text}`;
}

/** Re-draws everything that depends on the current year. */
function render(newIndex = state.index) {
  state.index = Math.max(0, Math.min(series().length - 1, newIndex));
  renderReadout();
  renderCaption();
  renderGlobe();
  renderMilestone();
  drawChart();
}

/* ================================ 6. Playback ================================ */

const stepDelay = () => Math.round(140 / +$('spd').value);

function updatePlayButton() {
  const playing = state.timer !== null;
  $('pp').textContent = playing ? '❚❚' : '▶';
  $('pp').setAttribute('aria-label', t(playing ? 'pause' : 'play'));
}

function tick() {
  if (state.index >= series().length - 1) { pause(); announce(t('end')); return; }
  render(state.index + 1);
  playCurrentNote();
  speakDecade();
}
function play() {
  if (state.index >= series().length - 1) state.index = 0;
  document.body.classList.add('playing');
  clearInterval(state.timer);
  state.timer = setInterval(tick, stepDelay());
  updatePlayButton();
}
function pause() {
  clearInterval(state.timer);
  state.timer = null;
  document.body.classList.remove('playing');
  updatePlayButton();
}
const togglePlay = () => (state.timer ? pause() : play());

/** Manual step (arrows / buttons): move, play the note and tell screen readers. */
function stepBy(delta) {
  render(state.index + delta);
  playCurrentNote();
  const point = current();
  announce(`${point.y}: ${isEnsemble() ? ensembleValues(point) : format(point.v)}`);
}

/* ================== 7. Panels (info, summary, table, language) ================== */

function statusOf(key) {
  const ds = datasets[key];
  if (ds.custom) return `${c('ccustom')} (${ds.data[0].y}–${ds.data.at(-1).y})`;
  return ds.official ? fill(t('real'), { a: ds.data[0].y, b: ds.data.at(-1).y }) : t('demo');
}

function summarize(key) {
  const ds = datasets[key];
  const first = ds.data[0];
  const last = ds.data.at(-1);
  const highest = ds.data.reduce((a, b) => (b.v > a.v ? b : a));
  const lowest = ds.data.reduce((a, b) => (b.v < a.v ? b : a));
  return fill(t('sumt'), {
    n: t(key), a: first.y, fa: formatValue(key, first.v), b: last.y, fb: formatValue(key, last.v),
    d: formatValue(key, last.v - first.v, true),
    my: highest.y, fmx: formatValue(key, highest.v), ny: lowest.y, fmn: formatValue(key, lowest.v),
  });
}
function readSummary() {
  const text = isEnsemble() ? SERIES.map(summarize).join(' ') : summarize(state.dataset);
  $('sum').textContent = text;
  speak(text);
}

function renderInfo() {
  const key = state.dataset;
  const ds = datasets[key];
  const ensemble = isEnsemble();
  const official = ensemble ? SERIES.every((k) => datasets[k].official) : ds.official;

  $('tn').textContent = `${ds.icon} ${t(key)}`;
  $('cn').textContent = `${ds.icon} ${t(key)}`;
  $('mt').textContent = ensemble ? `🎼 ${t('ens')}` : t(`mt_${key}`);
  const custom = ensemble ? SERIES.some((k) => datasets[k].custom) : ds.custom;
  $('demo').textContent = custom ? `· ✎ ${c('ccustom')}` : official ? '· ✔' : `· ${t('demo')}`;
  $('demo').className = official && !custom ? '' : 'warn';
  $('cunit').value = ensemble ? '' : ds.unit.trim();
  fillRows();

  $('src').textContent = ensemble
    ? SERIES.map((k) => `${datasets[k].icon} ${t(k)}: ${statusOf(k)}`).join(' · ')
    : `${ds.icon} ${t(key)}: ${statusOf(key)}`;
  $('src2').textContent = ensemble
    ? SERIES.map((k) => `${datasets[k].icon} ${datasets[k].source}`).join('\n')
    : `${t('srcw')} ${ds.source}`;

  const lineStyles = ['──', '╌╌', '┄┄', '─·'];
  $('leg').innerHTML = ensemble
    ? SERIES.map((k, i) => `<span>${datasets[k].icon} ${t(k)} ${lineStyles[i]}</span>`).join('')
    : '';

  $('insel').disabled = ensemble;
  $('sum').textContent = '';
  $('tbl').innerHTML = '';
  $('tbd').open = false;
  $$('.chip').forEach((chip) => {
    const active = chip.dataset.k === key;
    chip.classList.toggle('on', active);
    chip.setAttribute('aria-pressed', active);
  });
}

/** Builds the accessible table (for screen-reader users) the first time the panel opens. */
function renderTable() {
  if (!$('tbd').open || $('tbl').innerHTML) return;
  const ensemble = isEnsemble();
  const head = ensemble ? SERIES.map((k) => `<th>${t(k)}</th>`).join('') : `<th>${t(state.dataset)}</th>`;
  const rows = series().map((p) => {
    const cells = ensemble
      ? p.a.map((v, i) => `<td>${formatValue(SERIES[i], v)}</td>`).join('')
      : `<td>${format(p.v)}</td>`;
    return `<tr><td>${p.y}</td>${cells}</tr>`;
  });
  $('tbl').innerHTML = `<table><tr><th>${t('year')}</th>${head}</tr>${rows.join('')}</table>`;
}

function selectDataset(key) {
  pause();
  state.dataset = key;
  if (key === 'ens') {
    buildEnsemble();
    if (!datasets.ens.data.length) { announce(c('cens')); return; }
  }
  renderInfo();
  render(series().length - 1);
  announce(t(key));
}

function applyLanguage() {
  root.lang = state.lang;
  root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i]').forEach((el) => { el.textContent = t(el.dataset.i); });
  document.title = `Naaah · ${t('title')}`;
  $('lang').setAttribute('aria-label', t('lang'));
  $('prev').setAttribute('aria-label', t('prev'));
  $('next').setAttribute('aria-label', t('next'));
  $('chips').setAttribute('aria-label', t('data'));
  $$('[data-ph]').forEach((el) => { el.placeholder = t(el.dataset.ph); });
  $$('[data-c]').forEach((el) => { el.textContent = c(el.dataset.c); });
  $('cta').placeholder = c('cph');
  $('mhint').textContent = c(editMode ? 'mhCus' : 'mhOff');
  $('mic').setAttribute('aria-label', t('aimic'));
  refreshGreeting();
  renderSuggestions();
  updatePlayButton();
  renderInfo();
  render();
}

function setReducedMotion(on) {
  root.classList.toggle('rm', on);
  $('rmt').checked = on;
  const heroSvg = document.querySelector('.hero svg');
  if (heroSvg?.pauseAnimations) on ? heroSvg.pauseAnimations() : heroSvg.unpauseAnimations();
}

/** Extra strings for the custom-data panel (uz, en, ru; other languages fall back to English). */
const CUSTOM_I18N = {
  en: {
    mOff: '📊 Official data (demo)', mCus: '✎ Enter my own',
    mhOff: 'These are the official values built into the app. Switch to “Enter my own” to edit them.',
    mhCus: 'Edit the rows (“year, value”), paste your own, or load a CSV, then press “Use this data”.',
    ctitle: 'Your own data (custom mode)',
    chint: 'Paste rows as “year, value” for the selected dataset, or load a CSV from NASA, NOAA or NSIDC. It plays and draws exactly like the built-in data.',
    cfile: '📁 Choose CSV file', capply: '▶ Use this data', creset: '↺ Restore official data', cunit: 'Unit (optional)',
    ccustom: 'CUSTOM (your data)', cok: '{n} points loaded ({a}–{b}).', cbad: 'Need at least 3 rows like “year, value”.',
    cens: 'Pick a single dataset first (not available in the All together mode).', cdone: 'Official data restored.',
    cph: '1993, 0\n1994, 3.2\n1995, 5.1',
  },
  uz: {
    mOff: '📊 Rasmiy ma’lumot (demo)', mCus: '✎ O‘zim kiritaman',
    mhOff: 'Bu ilovaga joylangan rasmiy qiymatlar. Tahrirlash uchun “O‘zim kiritaman” ni bosing.',
    mhCus: 'Qatorlarni (“yil, qiymat”) o‘zgartiring, o‘zingiznikini joylang yoki CSV yuklang, so‘ng “Qo‘llash” ni bosing.',
    ctitle: 'O‘z ma’lumotingiz (maxsus rejim)',
    chint: 'Tanlangan ma’lumot turi uchun qatorlarni “yil, qiymat” ko‘rinishida joylashtiring yoki NASA, NOAA, NSIDC CSV faylini yuklang. U ichki ma’lumot bilan bir xil chiziladi va ijro etiladi.',
    cfile: '📁 CSV fayl tanlash', capply: '▶ Qo‘llash', creset: '↺ Rasmiy ma’lumotga qaytish', cunit: 'Birlik (ixtiyoriy)',
    ccustom: 'MAXSUS (sizning ma’lumotingiz)', cok: '{n} ta nuqta yuklandi ({a}–{b}).', cbad: 'Kamida 3 ta “yil, qiymat” qatori kerak.',
    cens: 'Avval bitta ma’lumot turini tanlang (“Hammasi birga” rejimida bo‘lmaydi).', cdone: 'Rasmiy ma’lumot tiklandi.',
    cph: '1993, 0\n1994, 3.2\n1995, 5.1',
  },
  ru: {
    mOff: '📊 Официальные данные (демо)', mCus: '✎ Ввести свои',
    mhOff: 'Это официальные значения, встроенные в приложение. Чтобы изменить их, нажмите «Ввести свои».',
    mhCus: 'Измените строки («год, значение»), вставьте свои или загрузите CSV и нажмите «Применить».',
    ctitle: 'Ваши данные (свой режим)',
    chint: 'Вставьте строки «год, значение» для выбранного набора или загрузите CSV с NASA, NOAA или NSIDC. Они рисуются и звучат так же, как встроенные.',
    cfile: '📁 Выбрать CSV', capply: '▶ Применить', creset: '↺ Вернуть официальные данные', cunit: 'Единица (необязательно)',
    ccustom: 'СВОИ (ваши данные)', cok: 'Загружено точек: {n} ({a}–{b}).', cbad: 'Нужно минимум 3 строки «год, значение».',
    cens: 'Сначала выберите один набор (в режиме «Все вместе» недоступно).', cdone: 'Официальные данные восстановлены.',
    cph: '1993, 0\n1994, 3.2\n1995, 5.1',
  },
};
function c(key) { return (CUSTOM_I18N[state.lang] || CUSTOM_I18N.en)[key] ?? CUSTOM_I18N.en[key]; }

/** Accepts commas, semicolons, tabs or spaces between the year and the value. */
function normalizeRows(text) {
  return text.split(/\r?\n/).map((line) => (line.includes(',') ? line : line.trim().replace(/[;\t ]+/g, ','))).join('\n');
}

let editMode = false;
const rowsText = (ds) => ds.data.map((pt) => `${pt.y}, ${pt.v}`).join('\n');
function fillRows() {
  const key = state.dataset, ds = datasets[key];
  const sig = isEnsemble() ? 'ens' : `${key}|${ds.custom ? 1 : 0}|${ds.data.length}`;
  if ($('cta').dataset.sig === sig) return;
  $('cta').dataset.sig = sig;
  $('cta').value = isEnsemble() ? '' : rowsText(ds);
}
function setMode(edit) {
  editMode = edit;
  if (!edit && !isEnsemble() && datasets[state.dataset].custom) restoreOfficial();
  $('mOff').classList.toggle('on', !edit); $('mOff').setAttribute('aria-pressed', !edit);
  $('mCus').classList.toggle('on', edit); $('mCus').setAttribute('aria-pressed', edit);
  $('cta').readOnly = !edit; $('crow').hidden = !edit; $('ulab').hidden = !edit;
  $('mhint').textContent = c(edit ? 'mhCus' : 'mhOff');
  if (!edit) $('cmsg').textContent = '';
  fillRows();
}

function applyCustom(text) {
  const key = state.dataset;
  if (isEnsemble()) { $('cmsg').textContent = c('cens'); return; }
  const byYear = new Map(parseCsv(normalizeRows(text), key).map((p) => [p.y, p.v]));
  const points = [...byYear.entries()].sort((a, b) => a[0] - b[0]).map(([y, v]) => ({ y, v }));
  if (points.length < 3) { $('cmsg').textContent = c('cbad'); return; }
  pause();
  const ds = datasets[key];
  const unit = $('cunit').value.trim();
  ds.data = points;
  ds.official = false;
  ds.custom = true;
  ds.unit = unit ? (/^[°%]/.test(unit) ? unit : ` ${unit}`) : ds.unit;
  ds.decimals = points.every((p) => Number.isInteger(p.v)) ? 0 : 2;
  ds.signed = points.some((p) => p.v < 0);
  buildEnsemble();
  renderInfo();
  render(points.length - 1);
  $('cmsg').textContent = fill(c('cok'), { n: points.length, a: points[0].y, b: points.at(-1).y });
  announce(statusOf(key));
}

function restoreOfficial() {
  const key = state.dataset;
  if (isEnsemble()) { $('cmsg').textContent = c('cens'); return; }
  const ds = datasets[key];
  pause();
  Object.assign(ds, ds.builtin, { official: true, custom: false });
  buildEnsemble();
  renderInfo();
  render(ds.data.length - 1);
  $('cmsg').textContent = c('cdone');
}

function loadOfficialFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { $('cta').value = reader.result.slice(0, 200000); applyCustom(reader.result); };
  reader.onerror = () => { $('cmsg').textContent = t('fail'); };
  reader.readAsText(file);
}

/* ============================ 9. AI assistant ============================= */

const LANGUAGE_NAMES = {
  uz: 'Uzbek (Latin alphabet)', en: 'English', ru: 'Russian', zh: 'Simplified Chinese',
  hi: 'Hindi', es: 'Spanish', ar: 'Arabic', fr: 'French',
};

const assistant = {
  sample: null,        // "ask Claude" capability (null when unavailable)
  dictation: null,     // speech-to-text capability (null when unavailable)
  history: [],         // alternating user / assistant turns
  controller: null,    // AbortController for the running request
  recognizer: null,    // fallback: the browser's own speech recognition
  listening: false,
  voiceAsk: false,     // true while the current question is being dictated
  typedBefore: '',
  greeting: null,
};

const SUGGEST = {
  uz: ['Harorat qancha oshdi?', 'Dengiz muzini ijro et', '2000-yilga o‘t', 'Bu ovoz nimani bildiradi?'],
  en: ['How much has temperature risen?', 'Play the sea ice data', 'Go to the year 2000', 'What does this sound mean?'],
  ru: ['На сколько выросла температура?', 'Включи данные о морском льде', 'Перейди к 2000 году', 'Что означает этот звук?'],
  zh: ['气温上升了多少？', '播放海冰数据', '跳到2000年', '这个声音代表什么？'],
  hi: ['तापमान कितना बढ़ा?', 'समुद्री बर्फ़ का डेटा चलाओ', 'साल 2000 पर जाओ', 'इस ध्वनि का क्या मतलब है?'],
  es: ['¿Cuánto subió la temperatura?', 'Reproduce el hielo marino', 'Ve al año 2000', '¿Qué significa este sonido?'],
  ar: ['كم ارتفعت الحرارة؟', 'شغّل بيانات الجليد البحري', 'انتقل إلى عام 2000', 'ماذا يعني هذا الصوت؟'],
  fr: ['De combien la température a-t-elle monté ?', 'Joue la glace de mer', 'Va à l’année 2000', 'Que signifie ce son ?'],
};

function renderSuggestions() {
  const box = $('sug');
  box.textContent = '';
  if (assistant.history.length) return;
  (SUGGEST[state.lang] || SUGGEST.en).forEach((q) => {
    const b = document.createElement('button');
    b.className = 'bt';
    b.textContent = q;
    b.onclick = () => { if (!$('aisend').disabled) ask(q); };
    box.appendChild(b);
  });
}

/** Lets the assistant drive the app: pick a dataset, jump to a year, play or pause. */
function assistantTools() {
  return [
    {
      name: 'set_dataset',
      description: 'Switch the app to a dataset: temp, co2, ice, sea, or ens (all four together).',
      inputSchema: { type: 'object', properties: { key: { type: 'string', enum: [...SERIES, 'ens'] } }, required: ['key'] },
      execute: ({ key }) => { if (![...SERIES, 'ens'].includes(key)) throw new Error('unknown dataset'); selectDataset(key); return { ok: true, dataset: key }; },
    },
    {
      name: 'go_to_year',
      description: 'Jump to a year in the current dataset (nearest available year is used).',
      inputSchema: { type: 'object', properties: { year: { type: 'number' } }, required: ['year'] },
      execute: ({ year }) => {
        pause();
        const pts = series();
        let best = 0;
        pts.forEach((pt, i) => { if (Math.abs(pt.y - year) < Math.abs(pts[best].y - year)) best = i; });
        render(best);
        playCurrentNote();
        return { ok: true, year: current().y };
      },
    },
    {
      name: 'play',
      description: 'Start playing the current dataset as sound from the current year.',
      execute: () => { play(); return { ok: true }; },
    },
    {
      name: 'pause',
      description: 'Pause playback.',
      execute: () => { pause(); return { ok: true }; },
    },
  ];
}

const hasBrowserRecognition = () => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

async function connectAssistant() {
  try { assistant.sample = (await window.claude?.use('sample')) ?? null; } catch { assistant.sample = null; }
  try { assistant.dictation = (await window.claude?.use('dictation')) ?? null; } catch { assistant.dictation = null; }
  if (assistant.dictation) wireDictation(assistant.dictation);
  $('mic').hidden = !assistant.dictation && !hasBrowserRecognition();
}

function addBubble(role, text) {
  const bubble = document.createElement('div');
  bubble.className = `bub-${role}`;
  bubble.textContent = text;
  $('chat').appendChild(bubble);
  $('chat').scrollTop = $('chat').scrollHeight;
  return bubble;
}

function refreshGreeting() {
  if (assistant.greeting?.isConnected && assistant.history.length === 0) assistant.greeting.textContent = t('aihi');
}

function setBusy(busy) {
  $('aistop').hidden = !busy;
  $('aisend').disabled = busy;
}

/** Everything the assistant needs to know: the app, the language to answer in, and the data on screen. */
function buildInstructions() {
  const point = current();
  const dataLines = SERIES.map((key) => {
    const ds = datasets[key];
    const status = ds.custom ? 'custom data entered by the viewer' : ds.official ? 'official data' : 'DEMO approximate data';
    const values = ds.data.map((p) => `${p.y}:${p.v.toFixed(ds.decimals)}`).join(' ');
    return `${t(key)} (${status}, unit "${ds.unit.trim()}"): ${values}`;
  });
  return [
    'You are the friendly voice assistant of "Earth Jukebox", a web app made by Team Naaah (students from Tashkent) for the NASA Space Apps Challenge 2026 challenge "The Earth Information Jukebox".',
    'The app turns Earth data into sound: each note is one year and a higher pitch means a higher value. It has four datasets (global temperature anomaly, atmospheric CO2, September Arctic sea-ice extent, sea level) and an ensemble mode that plays all four together. It is also designed for blind, low-vision and hard-of-hearing users.',
    `Reply in ${LANGUAGE_NAMES[state.lang]}. Your answer is read aloud, so write 2-4 short, plain sentences: no markdown, no lists, no emojis.`,
    'Use the data below to answer questions about values and trends. Values marked DEMO are approximate placeholders: say "about" and mention they are demo values when you quote them. Temperature values are anomalies in degrees Celsius relative to 1951-1980. If you do not know something, say so honestly; you cannot browse the web.',
    'You can control the app with tools: set_dataset, go_to_year, play, pause. Use them when the viewer asks to see, hear, play or jump to something, then confirm in one short sentence what you did.',
    `The viewer is currently looking at: ${t(state.dataset)}, year ${point.y}.`,
    'DATA (year:value):',
    ...dataLines,
  ].join('\n');
}

function utter(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#`>]/g, ''));
  utterance.lang = SPEECH_LANG[state.lang];
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

async function ask(question) {
  if (!assistant.sample) { addBubble('a', t('aierr')); return; }
  addBubble('u', question);
  $('sug').textContent = '';
  $('aiq').value = '';
  const bubble = addBubble('a', t('aithink'));

  assistant.history.push({ role: 'user', content: question });
  assistant.controller = new AbortController();
  setBusy(true);

  let recent = assistant.history.slice(-8);
  if (recent[0]?.role !== 'user') recent = recent.slice(1); // always start on a user turn
  const turns = recent.map((turn, i) => (i === 0
    ? { role: 'user', content: `${buildInstructions()}\n\nQUESTION:\n${turn.content}` }
    : turn));
  try {
    const { text } = await assistant.sample(turns, {
      cache: false,
      modelTier: 'quick',
      tools: assistantTools(),
      signal: assistant.controller.signal,
      onText: ({ text: partial }) => { bubble.textContent = partial; $('chat').scrollTop = $('chat').scrollHeight; },
    });
    bubble.textContent = text;
    assistant.history.push({ role: 'assistant', content: text });
    if ($('aispeak').checked) utter(text);
  } catch (error) {
    assistant.history.pop(); // keep the history alternating user / assistant
    if (error?.code === 'cancelled') bubble.remove();
    else bubble.textContent = t('aierr');
  } finally {
    setBusy(false);
  }
}

function sendTyped() {
  const question = $('aiq').value.trim();
  if (question && !$('aisend').disabled) ask(question);
}

/* ----- Voice input ----- */

function wireDictation(dictation) {
  dictation.onPartial(({ text }) => { $('aiq').value = assistant.typedBefore + text; });
  dictation.onFinal(({ text }) => {
    assistant.typedBefore += `${text} `;
    $('aiq').value = assistant.typedBefore;
  });
  dictation.onState(({ state: dictationState }) => {
    assistant.listening = dictationState === 'listening' || dictationState === 'starting';
    $('mic').classList.toggle('on', dictationState === 'listening');
    $('aistat').textContent = dictationState === 'listening' ? t('ailisten') : '';
    if (dictationState === 'idle' && assistant.voiceAsk) {
      assistant.voiceAsk = false;
      const question = $('aiq').value.trim();
      if (question) ask(question);
    }
  });
}

/** Fallback for browsers that have their own speech recognition (e.g. Chrome). */
function startBrowserRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const fail = () => { assistant.voiceAsk = false; $('aistat').textContent = t('ainomic'); };
  if (!Recognition) { fail(); return; }

  const recognizer = new Recognition();
  recognizer.lang = SPEECH_LANG[state.lang];
  recognizer.interimResults = true;
  recognizer.onstart = () => {
    assistant.listening = true;
    $('mic').classList.add('on');
    $('aistat').textContent = t('ailisten');
  };
  recognizer.onresult = (e) => { $('aiq').value = Array.from(e.results).map((r) => r[0].transcript).join(''); };
  recognizer.onerror = fail;
  recognizer.onend = () => {
    assistant.listening = false;
    $('mic').classList.remove('on');
    if ($('aistat').textContent === t('ailisten')) $('aistat').textContent = '';
    if (assistant.voiceAsk) {
      assistant.voiceAsk = false;
      const question = $('aiq').value.trim();
      if (question) ask(question);
    }
  };
  try { recognizer.start(); assistant.recognizer = recognizer; } catch { fail(); }
}

/** Must run straight from a click: browsers only open the microphone after a user gesture. */
function toggleMic() {
  if (assistant.listening) {
    if (assistant.dictation) assistant.dictation.stop(); else assistant.recognizer?.stop();
    return;
  }
  window.speechSynthesis?.cancel();
  assistant.typedBefore = '';
  $('aiq').value = '';
  assistant.voiceAsk = true;
  if (assistant.dictation) {
    assistant.dictation.start(state.lang === 'uz' ? {} : { language: state.lang }).catch((error) => {
      assistant.voiceAsk = false;
      $('aistat').textContent = ['not_granted', 'dismissed', 'stopped'].includes(error?.code) ? '' : t('ainomic');
    });
  } else {
    startBrowserRecognition();
  }
}

function bindAssistant() {
  assistant.greeting = addBubble('a', t('aihi'));
  $('mic').onclick = toggleMic;
  $('aisend').onclick = sendTyped;
  $('aiq').onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); sendTyped(); } };
  $('aistop').onclick = () => { assistant.controller?.abort(); window.speechSynthesis?.cancel(); };
  $('askNow').onclick = () => {
    document.querySelector('.nb[data-v="ai"]').click(); // show the assistant, then listen straight away
    toggleMic();
  };
}

/* =========================== 8. Events & start-up =========================== */

function bindEvents() {
  $('pp').onclick = togglePlay;
  $('prev').onclick = () => stepBy(-1);
  $('next').onclick = () => stepBy(1);
  $('rst').onclick = () => { pause(); render(0); };
  $('sumb').onclick = readSummary;
  $('tbd').ontoggle = renderTable;
  $('cap_t').onchange = renderCaption;
  $('lang').onchange = (e) => { state.lang = e.target.value; applyLanguage(); };
  $('file').onchange = (e) => { loadOfficialFile(e.target.files[0]); e.target.value = ''; };
  $('capply').onclick = () => applyCustom($('cta').value);
  $('creset').onclick = restoreOfficial;
  $('mOff').onclick = () => setMode(false);
  $('mCus').onclick = () => setMode(true);
  $('spd').oninput = (e) => {
    $('sx').textContent = `${(+e.target.value).toFixed(1)}x`;
    if (state.timer) play();
  };

  $('bigt').onchange = (e) => { root.classList.toggle('big', e.target.checked); drawChart(); };
  $('hct').onchange = (e) => { root.classList.toggle('hc', e.target.checked); drawChart(); };
  $('rmt').onchange = (e) => setReducedMotion(e.target.checked);

  $$('.chip').forEach((chip) => { chip.onclick = () => selectDataset(chip.dataset.k); });
  $$('.nb').forEach((tab) => {
    tab.onclick = () => {
      $$('.nb').forEach((other) => other.classList.toggle('on', other === tab));
      $$('.view').forEach((view) => view.classList.toggle('on', view.id === `v-${tab.dataset.v}`));
      drawChart();
    };
  });
  $$('[data-t]').forEach((button) => {
    button.onclick = () => {
      if (button.dataset.t) root.setAttribute('data-theme', button.dataset.t);
      else root.removeAttribute('data-theme');
      drawChart();
    };
  });

  // Keyboard shortcuts (ignored while a form control has focus).
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA'].includes(e.target?.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
    const datasetKeys = ['temp', 'co2', 'ice', 'sea', 'ens'];
    if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); stepBy(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); stepBy(-1); }
    else if (e.key === 'Home') { e.preventDefault(); pause(); render(0); }
    else if (e.key.toLowerCase() === 's') readSummary();
    else if (/^[1-5]$/.test(e.key)) selectDataset(datasetKeys[+e.key - 1]);
  });
  bindAssistant();
  window.addEventListener('resize', drawChart);
}

function init() {
  bindEvents();
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setReducedMotion(true);
  buildEnsemble();
  state.index = series().length - 1; // start on the latest year
  applyLanguage();
  connectAssistant();
}

init();
})();

