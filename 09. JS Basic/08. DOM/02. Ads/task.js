const SPEED = 1000;
const rotators = Array.from(document.querySelectorAll('.rotator'));

rotators.forEach((rotator) => {

    const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
    
    if (cases.length > 0) {

        let next = 0;
        const firstDataSet = cases[next].dataset;

        cases[next].style.color = firstDataSet.color;
        
        setTimeout(function tick() {

            cases[next].classList.remove('rotator__case_active');
            
            if (++next == cases.length) {
                next = 0;
            }

            const dataSet = cases[next].dataset;
            
            cases[next].style.color = dataSet.color;
            cases[next].classList.add('rotator__case_active');

            setTimeout(tick, dataSet.speed ? dataSet.speed : SPEED);
        }, firstDataSet.speed ? firstDataSet.speed : SPEED);
    }
});