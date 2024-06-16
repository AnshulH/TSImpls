const throttle = <F extends (...args: any[]) => any>(
    func: F, 
    time: number
) => {
    let delay = false;
  
    return (...args: Parameters<F>) => {
      if (delay) {
        return;
      }
  
      func(...args);
      delay = true;
      setTimeout(() => {
        delay = false;
      }, time);
    };
}
export default throttle;