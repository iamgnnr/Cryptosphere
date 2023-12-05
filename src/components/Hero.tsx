import '../Hero.css'
import Bitcoin from '../assets/bitcoin.svg'


const Hero = () => {
    return (
        <div id="hero-background">
            <div id="main">
                <div id="child" className="coin front">
                    <img src={Bitcoin} className='bitcoin-logo' />
                </div>
                <div id="child1" className="coin"></div>
                <div id="child2" className="coin"></div>
                <div id="child3" className="coin"></div>
                <div id="child4" className="coin"></div>
                <div id="child5" className="coin"></div>
                <div id="child6" className="coin"></div>
                <div id="child7" className="coin"></div>
                <div id="child8" className="coin">
                    <img src={Bitcoin} className='bitcoin-logo' />
                </div>
            </div>
            <h1 className='hero-title'>Crypto Index</h1>
        </div>
    );
}

export default Hero;
