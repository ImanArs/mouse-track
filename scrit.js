const letters = document.querySelectorAll('.letter');
const body = document.querySelector("body");
const container = document.querySelector('.container'); // Найдем контейнер

document.onmousemove = (e) => {
  const { clientX, clientY, movementX, movementY } = e;

  // Создаем анимированный кружок, который следует за курсором
  const createDiv = document.createElement("div");
  createDiv.style.position = "absolute";
  createDiv.style.top = `calc(${clientY}px - 50px)`;
  createDiv.style.left = `calc(${clientX}px - 50px)`;
  createDiv.style.width = "100px";
  createDiv.style.height = "100px";
  createDiv.style.background = "red";
  createDiv.style.opacity = "0.5";
  createDiv.style.transition = "all 5s";
  createDiv.style.borderRadius = `${movementX * movementY + 20}%`;
  body.appendChild(createDiv);
  
  // Удаляем кружок спустя небольшую задержку
  setTimeout(() => {
    createDiv.remove();
  }, 100);

  // Притягивание букв
  letters.forEach((letter) => {
    const rect = letter.getBoundingClientRect();
    const letterX = rect.left + rect.width / 2;
    const letterY = rect.top + rect.height / 2;

    // Вычисляем расстояние от курсора до центра буквы
    const distanceX = clientX - letterX;
    const distanceY = clientY - letterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Если курсор рядом (например, ближе 100px), притягиваем буквы
    const magnetDistance = 100; // Радиус действия магнита
    if (distance < magnetDistance) {
      const strength = (1 - distance / magnetDistance) * 30; // Интенсивность движения
      letter.style.transform = `translate(${distanceX / distance * strength}px, ${distanceY / distance * strength}px)`;
    } else {
      letter.style.transform = ''; // Возвращаем на место
    }
  });

  // Получаем координаты и размеры контейнера
  const containerRect = container.getBoundingClientRect();
  
  // Проверяем, находится ли курсор внутри контейнера
  if (
    clientX >= containerRect.left &&
    clientX <= containerRect.right &&
    clientY >= containerRect.top &&
    clientY <= containerRect.bottom
  ) {
    alert("Вы прикоснулись к контейнеру!");
  }
};
