import React, { useState } from 'react'
import Style from 'styled-components';
import './bracketView.scss';

interface Props {

}

let number = 100;

const BracketContainer = Style.div`
    display: grid;
    grid-template-columns: 4em;
    grid-template-rows: repeat(16, 1em);
    justify-items: start;
    grid-auto-columns: 4em;
    grid-column-gap: 5em;
    grid-row-gap: 1.5em;
    grid-auto-flow: column;
    align-items: center;
    margin-bottom: 2em;
    `;
const BoutContainer = Style.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;

const TestBout = Style.div`
    height:100px;
    width:100px;
    background-color: blue;
    `

// height: ${number}vh;

const divStyles = {
    // width: '50%',
    // height: '50%',
    backgroundColor: 'red',
    // gridArea: 'auto',
    // gridRow: '1 /2'
    width: '100%',
    height: '90%',
}
const rowSpan = {
    gridRow: 'span 2',
    backgroundColor: 'blue',
    width: '100%',
    height: '90%',
}
const rowSpan2 = {
    gridRow: 'span 4',
    backgroundColor: 'orange',
    width: '100%',
    height: '90%',
}
const rowSpan3 = {
    gridRow: 'span 8',
    backgroundColor: 'green',
    width: '100%',
    height: '90%',
}
const rowSpan4 = {
    gridRow: 'span 16',
    backgroundColor: 'pink',
    width: '100%',
    height: '90%',
}


const BracketView: React.FC<Props> = (props) => {
    const [winnersTrueFalse, setWinnersTrueFalse] = useState(true);
    const [losersTrueFalse, setLosersTrueFalse] = useState(true);

    const winners = () => setWinnersTrueFalse(!winnersTrueFalse)
    const losers = () => setLosersTrueFalse(!losersTrueFalse)

    return (

        <>

            <div className="d-flex justify-content-around mt-2 mb-5">
                <div className="btn btn-primary" onClick={winners}>Toggle Winners Bracket</div>
                <div className="btn btn-secondary" onClick={losers}>Toggle Loser Bracket</div>
            </div>

            <div className="row col-11">
                <div className="d-flex flex-column justify-content-around align-items-center">
                    {winnersTrueFalse && <BracketContainer>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>1</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>2</TestBout></BoutContainer>
                            </>
                        </div >
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>3</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>4</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>5</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>6</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>7</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>8</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>9</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>10</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>11</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>12</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>13</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>14</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>15</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>16</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>17</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>18</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>19</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>20</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>21</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>22</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>23</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>24</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan2}>
                            <>
                                <BoutContainer><TestBout>25</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan2}>
                            <>
                                <BoutContainer><TestBout>26</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan2}>
                            <>
                                <BoutContainer><TestBout>27</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan2}>
                            <>
                                <BoutContainer><TestBout>28</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan3}>
                            <>
                                <BoutContainer><TestBout>29</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan3}>
                            <>
                                <BoutContainer><TestBout>30</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan4}>
                            <>
                                <BoutContainer><TestBout>31</TestBout></BoutContainer>
                            </>
                        </div>
                    </BracketContainer >}
                    <div style={{ height: '2em', }}></div>
                    {losersTrueFalse && <BracketContainer>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>1</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>2</TestBout></BoutContainer>
                            </>
                        </div >
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>3</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>4</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>5</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>6</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>7</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>8</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>9</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>10</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>11</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>12</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>13</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>14</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>15</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={divStyles}>
                            <>
                                <BoutContainer><TestBout>16</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>17</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>18</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>19</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>20</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>21</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>22</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>23</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan}>
                            <>
                                <BoutContainer><TestBout>24</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan2}>
                            <>
                                <BoutContainer><TestBout>25</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan2}>
                            <>
                                <BoutContainer><TestBout>26</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan2}>
                            <>
                                <BoutContainer><TestBout>27</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan2}>
                            <>
                                <BoutContainer><TestBout>28</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan3}>
                            <>
                                <BoutContainer><TestBout>29</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan3}>
                            <>
                                <BoutContainer><TestBout>30</TestBout></BoutContainer>
                            </>
                        </div>
                        <div style={rowSpan4}>
                            <>
                                <BoutContainer><TestBout>31</TestBout></BoutContainer>
                            </>
                        </div>
                    </BracketContainer >}
                </div>
            </div>
        </>
    )
}
//   <div style={{ height: '200px', backgroundColor: 'aquamarine', position: 'relative' }}>
//             <BracketContainer>
//                 <div style={divStyles}>1</div>
//                 <div style={divStyles}> 2</div >
//                 <div style={divStyles}>3</div>
//                 <div style={divStyles}>4</div>
//                 <div style={divStyles}>5</div>
//                 <div style={divStyles}>6</div>
//                 <div style={divStyles}>7</div>
//                 <div style={divStyles}>8</div>
//                 <div style={divStyles}>9</div>
//                 <div style={divStyles}>10</div>
//                 <div style={divStyles}>11</div>
//                 <div style={divStyles}>12</div>
//                 <div style={divStyles}>13</div>
//                 <div style={divStyles}>14</div>
//                 <div style={divStyles}>15</div>
//                 <div style={divStyles}>16</div>
//                 <div style={divStyles}>17</div>
//                 <div style={divStyles}>18</div>
//                 <div style={divStyles}>19</div>
//                 <div style={divStyles}>20</div>
//                 <div style={divStyles}>21</div>
//                 <div style={divStyles}>22</div>
//                 <div style={divStyles}>23</div>
//                 <div style={divStyles}>24</div>
//                 <div style={divStyles}>25</div>
//                 <div style={divStyles}>26</div>
//                 <div style={divStyles}>27</div>
//                 <div style={divStyles}>28</div>
//                 <div style={divStyles}>29</div>
//                 <div style={divStyles}>30</div>
//                 <div style={divStyles}>31</div>
//                 <div style={divStyles}>32</div>
//                 <div style={divStyles}>33</div>
//                 <div style={divStyles}>34</div>
//                 <div style={divStyles}>35</div>
//                 <div style={divStyles}>36</div>
//                 <div style={divStyles}>37</div>
//                 <div style={divStyles}>38</div>
//                 <div style={divStyles}>39</div>
//                 <div style={divStyles}>40</div>
//                 <div style={divStyles}>41</div>
//                 <div style={divStyles}>42</div>
//                 <div style={divStyles}>43</div>
//                 <div style={divStyles}>44</div>
//                 <div style={divStyles}>45</div>
//                 <div style={divStyles}>46</div>
//                 <div style={divStyles}>47</div>
//                 <div style={divStyles}>48</div>
//                 <div style={divStyles}>49</div>
//                 <div style={divStyles}>50</div>
//                 <div style={divStyles}>51</div>
//                 <div style={divStyles}>52</div>
//                 <div style={divStyles}>53</div>
//                 <div style={divStyles}>54</div>
//                 <div style={divStyles}>55</div>
//                 <div style={divStyles}>56</div>
//                 <div style={divStyles}>57</div>
//                 <div style={divStyles}>58</div>
//                 <div style={divStyles}>59</div>
//                 <div style={divStyles}>60</div>
//                 <div style={divStyles}>61</div>
//                 <div style={divStyles}>62</div>
//                 <div style={divStyles}>63</div>
//                 <div style={divStyles}>64</div>
//             </BracketContainer >
//         </div>











{/* <ul className="round round-1">
                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Lousville <span>79</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">NC A&T <span>48</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Colo St <span>84</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">Missouri <span>72</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top ">Oklahoma St <span>55</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom winner">Oregon <span>68</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Saint Louis <span>64</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">New Mexico St <span>44</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Memphis <span>54</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">St Mary's <span>52</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Mich St <span>65</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">Valparaiso <span>54</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Creighton <span>67</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">Cincinnati <span>63</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Duke <span>73</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">Albany <span>61</span></li>

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-2">
                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Lousville <span>82</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">Colo St <span>56</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Oregon <span>74</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">Saint Louis <span>57</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top ">Memphis <span>48</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom winner">Mich St <span>70</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top ">Creighton <span>50</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom winner">Duke <span>66</span></li>

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-3">
                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Lousville <span>77</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">Oregon <span>69</span></li>

                <li className="spacer">&nbsp;</li>

                <li className="game game-top ">Mich St <span>61</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom winner">Duke <span>71</span></li>

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-4">
                <li className="spacer">&nbsp;</li>

                <li className="game game-top winner">Lousville <span>85</span></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">Duke <span>63</span></li>

                <li className="spacer">&nbsp;</li>
            </ul> */}













// other
//     <div id="tournament" className='brackets'>


//     <div className="col">
//         <div className="match">
//             <div className="player winner">winner 1</div>
//             <div className="player">loser 1</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 2</div>
//             <div className="player">loser 2</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 3</div>
//             <div className="player">loser 3</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 4</div>
//             <div className="player">loser 4</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 5</div>
//             <div className="player">loser 5</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 6</div>
//             <div className="player">loser 6</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 7</div>
//             <div className="player">loser 7</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 8</div>
//             <div className="player">loser 8</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 9</div>
//             <div className="player">loser 9</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 10</div>
//             <div className="player">loser 10</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 11</div>
//             <div className="player">loser 11</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 12</div>
//             <div className="player">loser 12</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 13</div>
//             <div className="player">loser 13</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 14</div>
//             <div className="player">loser 14</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 15</div>
//             <div className="player">loser 15</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 16</div>
//             <div className="player">loser 16</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//     </div>

//     <div className="col">
//         <div className="match">
//             <div className="player winner">winner 1</div>
//             <div className="player">loser 1</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 2</div>
//             <div className="player">loser 2</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 3</div>
//             <div className="player">loser 3</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 4</div>
//             <div className="player">loser 4</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 5</div>
//             <div className="player">loser 5</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 6</div>
//             <div className="player">loser 6</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 7</div>
//             <div className="player">loser 7</div>
//         </div>
//         <div className="match-spacer pipe"></div>

//         <div className="match">
//             <div className="player winner">winner 8</div>
//             <div className="player">loser 8</div>
//         </div>
//     </div>

// </div>





export default BracketView;