import { log, repeat } from '@juan-utils/functions'
import { Vector } from '@juan-utils/structures';

export const Sierpinski = (v0,v1,v2,init) => {
    const triangle = [v0,v1,v2]
    let points = [v0,v1,v2,init];
    let chosen = init;
    return {
        step(){
            if(!chosen){
                //pick random point inside triangle
            }else{
                const r = Math.floor(Math.random()*10 % 3)
                const rv = triangle[r]
                const newChosen = chosen.sub(rv).scale(1/2).add(chosen)
                points.push(newChosen);
                chosen = newChosen;
            }
        },
        walk(n){
            for( let i = 0 ; i < n ; i++ ){
                this.step();
            }
        },
        get(){
            return points;
        },
        reset(){
            points = [v0,v1,v2,init];
            chosen = init;
        }
    }
} 

export const BarnsleyFern = (a=1,b=85,c=7,d=7) => {
    const fs = [
        ({ y }) => Vector.of( 0 , 0.16 * y ),
        ({ x , y }) => Vector.of( (0.85*x) + (0.04*y) ,(-0.04*x) + (0.85*y) + 1.6 ),
        ({ x , y }) => Vector.of( (0.2*x) - (0.26*y) , (0.23*x) + (0.22*y) + 1.6 ),
        ({ x , y }) => Vector.of( (-0.15*x) + (0.28*y), (0.26*x) + (0.24*y) + 0.44)
    ]
    const probs = [
        ...repeat(a,0),
        ...repeat(b,1),
        ...repeat(c,2),
        ...repeat(d,3)
    ]
    let current = Vector.of(0,0);
    const points = [ current ];
    return {
        step(){
            const index = probs[Math.floor(Math.random() * probs.length)]
            const f = fs[index]
            current = f(current)
            points.push(current)
        },
        walk(n){
            for( let i = 0 ; i < n ; i++ ){
                this.step();
            }
        },
        get(){
            return points;
        }
    }
}