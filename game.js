document.addEventListener('DOMContentLoaded', function() {
    const scanlines = document.createElement('div'); // Cria a div, que não precisa ser colocada no codigo HTMl
    scanlines.classList.add('scalines'); //Add a nova class scanlines
    document.body.appendChild(scanlines); // Adiciona scanlines como filho do elemento body
});

const canvas = document.querySelector('canvas')
//"const" é usado para declarar um valor constante, uma variável cujo o valor não poe ser atribuido após sua inicialização.
const ctx = canvas.getContext('2d')

const size = 30 // vai subir de 30 em 30

const snake = [{ x: 270, y: 240 }]
//Aqui são os quadradinhos que vão formar a cobra. E onde a snake vai surgir.

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
} //Math.round arredonda o número

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
} // Faz a comida gerar uma cor diferente toda vez que é gerada.

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
} //#FA9F42

let direction, loopId

const drawFood = () => {

    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 20
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = '#ddd'
    
    snake.forEach((position, index) => {

        if (index == snake.length - 1) { 
            ctx.fillStyle = 'fff'
        } //cabeça da cobra

        ctx.fillRect(position.x, position.y, size, size)
    }) //Função que vai percorrer toda a "const = snake" que é a array.
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == 'right') {
        snake.push({ x: head.x + size, y: head.y })
    }

    
    if (direction == 'left') {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == 'down') {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == 'up') {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift() // remove o primeiro elemento da array, const snake.
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = '#11871E'

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

const chackEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)


        food.x = randomPosition(),
        food.y = randomPosition(),
        food.color = randomColor()
    }
} // Se a posição da cobra ser a mesma que dá comida, então isso mostra qe a cobra comeu a comida. É isso que está função irá fazer.

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)
    drawGrid() // Desenha o gride
    drawFood() //Desenha a comida
    moveSnake() //Move a cobra
    drawSnake() //Desenha a cobra
    chackEat() //Vê se a cobra comeu a comida

    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
} //loops podem ocasionar alguns bugs

gameLoop()

document.addEventListener('keydown', ({ key }) => {

    if (key == 'ArrowRight' && direction !== 'left') {
        direction = 'right'
    }

    if (key == 'ArrowLeft' && direction !== 'right') {
        direction = 'left'
    }

    if (key == 'ArrowDown' && direction !== 'up') {
        direction = 'down'
    }

    if (key == 'ArrowUp' && direction !== 'down') {
        direction = 'up'
    }
}) // Controles do jogo. O sinal !== é usada no codigo, com o intuito de se, o você tiver clicado na tecla right, você não poderá usar a tecla left, e up para down a mesma coisa.

//ctx.fillStyle = 'red' // cor do quadrado
//ctx.fillRect(100, 100, 50, 100) // (300 - 300) > Um quadrado preechido na posição 300, 300. (50 - 50) largura e altura.