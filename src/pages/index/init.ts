import {Core, Kore} from "@kirinnee/core"; 

const core: Core = new Kore();
core.ExtendPrimitives();



const $$ = (i: number): Promise<void> => new Promise<void>(r => setTimeout(r, i));
const isMobile = (): boolean => window.innerHeight > window.innerWidth;

export {
    $$,
    isMobile,
    core,
}
