// scripts.js
document.addEventListener("DOMContentLoaded", function () {
  let count = 0;

  const countButton = document.getElementById("count-button");
  const resetButton = document.getElementById("reset-button");
  const countDisplay = document.getElementById("count");
  const dhikrText = document.getElementById("dhikr-text");
  const tadaborContainer = document.getElementById("tadabor-container");
  const duaText = document.getElementById("dua-text");
  const duaButton = document.getElementById("dua-button");

  const adhkar = [
    "سبحان الله",
    "الحمد لله",
    "لا إله إلا الله",
    "الله أكبر",
    "لا حول ولا قوة إلا بالله",
    "سبحان الله وبحمده",
    "سبحان الله العظيم",
    "أستغفر الله",
    "اللهم صل على محمد",
    "لا إله إلا أنت سبحانك إني كنت من الظالمين",
  ];

  const duaForDeceased = [
    "اللهم اكرم نزلها",
    "اللهم عافها واعف عنها",
    "اللهم ارحم المتوفاة واغفر لها وأسكنها فسيح جناتك",
    "اللهم اغفر لها وارحمها وعافها واعف عنها وأكرم نزلها ووسع مدخلها واغسلها بالماء والثلج والبرد ونقها من الذنوب والخطايا كما تنقى الثوب الأبيض من الدنس",
  ];

  countButton.addEventListener("click", function () {
    count++;
    countDisplay.textContent = count;
    dhikrText.textContent = adhkar[Math.floor(Math.random() * adhkar.length)];
  });

  resetButton.addEventListener("click", function () {
    count = 0;
    countDisplay.textContent = count;
    dhikrText.textContent = "سبحان الله";
  });

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function fetchTadabor() {
    const suraCount = getRandomNumber(1, 10); // الحصول على رقم عشوائي بين 1 و 10
    const apiUrl = `https://mp3quran.net/api/v3/tadabor?sura=3&language=ar`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const tadaborItems = data.tadabor["3"];
      tadaborContainer.innerHTML = ""; // إفراغ المحتوى الحالي قبل إضافة العناصر الجديدة
      const item = tadaborItems[parseInt(Math.random() * tadaborItems.length)];
      const tadaborElement = document.createElement("div");
      tadaborElement.classList.add("tadabor-item");

      tadaborElement.innerHTML = `
              <video controls width="100%">
                  <source src="${item.video_url}" type="video/mp4">
                  متصفحك لا يدعم تشغيل الفيديو
              </video>
          `;

      tadaborContainer.appendChild(tadaborElement);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  let index = 0;
  function showDoaa() {
    if (index === duaForDeceased.length - 1) index = 0;
    else index++;
    const randomDua = duaForDeceased[index];

    duaText.textContent = randomDua;
  }
  fetchTadabor();
  setInterval(fetchTadabor, 30000); // يتم تحديث التدبر كل دقيقة

  duaButton.addEventListener("click", showDoaa);
});
