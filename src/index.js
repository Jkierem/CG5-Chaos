import * as p5 from 'p5';
import { Sierpinski, BarnsleyFern } from './chaos'
import { Vector } from '@juan-utils/structures'

const main = p => {
    const s = Sierpinski(
        Vector.of(10,p.width/2),
        Vector.of(300,100),
        Vector.of(200,350),
        Vector.of(50,50)
    )
    s.walk(100000);

    const b = BarnsleyFern();
    b.walk(100000)

    const c = BarnsleyFern(1,85,0,14);
    c.walk(100000);

    let state = 0

    p.setup = () => {
        p.createCanvas(400,400)
        window.addEventListener('click', () => state = (state + 1)%3)
    }

    p.draw = () => {
        p.translate(20,20)
        p.background("#777777");
        if( state === 0 ){
            p.stroke("#660077")
            s.get().forEach( v => {
                const [x,y] = v.toArray()
                p.point(x,y)
            })
        }else if( state === 1 ){
            p.stroke("#11ff11");
            b.get().forEach( v => {
                const [x,y] = v.toArray()
                const px = p.map(x, -2.1820, 2.6558, 0, p.width);
                const py = p.map(y, 0, 9.9983, p.height, 0);
                p.point(px,py)
            })
        }else{
            p.stroke("#11ff11");
            c.get().forEach( v => {
                const [x,y] = v.toArray()
                const px = p.map(x, -2.1820, 2.6558, 0, p.width);
                const py = p.map(y, 0, 9.9983, p.height, 0);
                p.point(px,py)
            })
        }
    }
}

const P5 = new p5(main);