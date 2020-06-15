using gram.WebCanvas;
using gram.SystemCollections;

gram.Script :: @Normal:Load {
	class <Main> {
		public Enemies = array[];	
		Enemies.Push(<Enemy>());
	}
	public class <Enemy> {
		void Main(x, y, radius) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.moveX = 0;
			this.moveY = 0;
		}
		void Update() {
		
		}
		void Draw() {
		
		}
		void Behavior() {
			void Walk() {
			
			}
			void Jump() {
			
			}
			void Hit() {
			
			}
		}
	}
}