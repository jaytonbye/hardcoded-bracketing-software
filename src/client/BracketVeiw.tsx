import React from 'react'
import Style from 'styled-components';

interface Props {

}

let number = 100;

const BracketContainer = Style.div`
    display: grid;
    grid-template-columns: 4em 4em 4em 4em 4em;
    grid-template-rows: 4em 4em 4em 4em 4em;
    grid-auto-row: 8em;
    grid-auto-column: 8em;
    justify-items: start;
    height: 50vh;
    `;
// height: ${number}vh;

const divStyles = {
    width: '50%',
    height: '50%',
    backgroundColor: 'red',
    // gridArea: 'auto',
    // gridRow: '1 /2'
}


const BracketView: React.FC<Props> = (props) => {
    return (
        <div style={{ height: '200px', backgroundColor: 'aquamarine', position: 'relative' }}>
            <BracketContainer>
                <div style={divStyles}>1</div>
                <div style={divStyles}> 2</div >
                <div style={divStyles}>3</div>
                <div style={divStyles}>4</div>
                <div style={divStyles}>5</div>
                <div style={divStyles}>6</div>
                <div style={divStyles}>7</div>
                <div style={divStyles}>8</div>
                <div style={divStyles}>9</div>
                <div style={divStyles}>10</div>
                <div style={divStyles}>11</div>
                <div style={divStyles}>12</div>
                <div style={divStyles}>13</div>
                <div style={divStyles}>14</div>
                <div style={divStyles}>15</div>
                <div style={divStyles}>16</div>
                <div style={divStyles}>17</div>
                <div style={divStyles}>18</div>
                <div style={divStyles}>19</div>
                <div style={divStyles}>20</div>
                <div style={divStyles}>21</div>
                <div style={divStyles}>22</div>
                <div style={divStyles}>23</div>
                <div style={divStyles}>24</div>
                <div style={divStyles}>25</div>
                <div style={divStyles}>26</div>
                <div style={divStyles}>27</div>
                <div style={divStyles}>28</div>
                <div style={divStyles}>29</div>
                <div style={divStyles}>30</div>
                <div style={divStyles}>31</div>
                <div style={divStyles}>32</div>
                <div style={divStyles}>33</div>
                <div style={divStyles}>34</div>
                <div style={divStyles}>35</div>
                <div style={divStyles}>36</div>
                <div style={divStyles}>37</div>
                <div style={divStyles}>38</div>
                <div style={divStyles}>39</div>
                <div style={divStyles}>40</div>
                <div style={divStyles}>41</div>
                <div style={divStyles}>42</div>
                <div style={divStyles}>43</div>
                <div style={divStyles}>44</div>
                <div style={divStyles}>45</div>
                <div style={divStyles}>46</div>
                <div style={divStyles}>47</div>
                <div style={divStyles}>48</div>
                <div style={divStyles}>49</div>
                <div style={divStyles}>50</div>
                <div style={divStyles}>51</div>
                <div style={divStyles}>52</div>
                <div style={divStyles}>53</div>
                <div style={divStyles}>54</div>
                <div style={divStyles}>55</div>
                <div style={divStyles}>56</div>
                <div style={divStyles}>57</div>
                <div style={divStyles}>58</div>
                <div style={divStyles}>59</div>
                <div style={divStyles}>60</div>
                <div style={divStyles}>61</div>
                <div style={divStyles}>62</div>
                <div style={divStyles}>63</div>
                <div style={divStyles}>64</div>
            </BracketContainer >
        </div>
    )
}

export default BracketView;