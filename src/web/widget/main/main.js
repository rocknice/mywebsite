require('./main.css');
const Main = {
	init() {
		window.onload = function() {

			var oCanvas = document.getElementById('canvasParticle');
			var cxt = null;
			//用来存放粒子的素组
			var particles = {};
			var particleIndex = 0;

			if (oCanvas.getContext) {
				cxt = oCanvas.getContext('2d');
			}

			oCanvas.width = window.innerWidth;
			oCanvas.height = window.innerHeight;

			function Particle() {
				particleIndex++;

				particles[particleIndex] = this;

				//粒子放射的中心点
				this.x = oCanvas.width / 2;
				this.y = oCanvas.height / 2;
				//初始化粒子沿X轴和Y轴的速度
				this.vx = Math.random() * 6 - 3;
				this.vy = Math.random() * 4 - 2;

				this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.01; // 根据x/y轴的位置决定大小
				this.id = particleIndex;
				this.size = 0;
				this.color = getRandomColor();
			};

			Particle.prototype.draw = function() {
				this.x += this.vx;
				this.y += this.vy;
				//根据移动的距离逐渐变大
				this.size += this.growth;

				if (this.x < 0 || this.x > oCanvas.width || this.y < 0 || this.y > oCanvas.height) {
					//出界则移除
					delete particles[this.id];
				}

				cxt.fillStyle = this.color;
				cxt.beginPath();
				cxt.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
				cxt.fill();
			};

			function animate() {
				requestAnimationFrame(animate);

				cxt.fillStyle = '#222222';
				cxt.fillRect(0, 0, oCanvas.width, oCanvas.height);
				//每次网数组添加一个数据
				new Particle();
				//遍历数组，依次画出
				for (var i in particles) {
					particles[i].draw();
				}
			};
			requestAnimationFrame(animate);
		};

		//随机颜色方法
		function getRandomColor() {
			return '#' + (Math.random() * 0xffffff << 0).toString(16);
		};
	}
}
export default Main;