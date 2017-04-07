'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import PagePreview from './PagePreview';

export const HomePage = () => (
            <div className="reactPageContainer">
                <div className="abw_homePage">
                    <div className="abw_homeLeft">

                        <div className="abw_hermineContainer">
                            <div className="abw_hermineDiv">
                                <img className="abw_hermine" src="/img/hermine.png"/>
                            </div>
                        </div>

                        <div className="abw_homePage_header">
                            <h1>Welcome to <strong>a Breton's workshop</strong></h1>
                            <p className="abw_headerFaded">Arnaud H-K</p>
                        </div>

                        <div className="abw_homeDescription">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus consequat varius. Morbi lectus nibh, accumsan id volutpat quis, tempus in felis. Sed eu faucibus dolor. Mauris in leo lacinia erat pretium dignissim lacinia eget diam. Nulla facilisi. Vestibulum in efficitur diam. Integer in consequat turpis. Suspendisse potenti. Duis leo dui, venenatis eget metus id, pharetra sodales lacus. Ut odio ipsum, varius vel dignissim quis, dapibus a massa. Suspendisse potenti. Donec tristique elit at iaculis mollis. In suscipit imperdiet lectus, vel auctor ipsum consectetur sed. Suspendisse semper urna sem.

                            Morbi at turpis at dolor lobortis lobortis eu nec felis. Donec auctor tortor porta risus gravida, eu semper dolor sagittis. Aliquam faucibus arcu a molestie cursus. Nulla porttitor finibus sem, nec condimentum diam laoreet vel. Proin ut tincidunt massa. Duis sodales ligula erat, non iaculis sem pellentesque a. Vivamus aliquet, nulla sit amet iaculis rhoncus, sapien sem accumsan lorem, at venenatis mauris ligula at tellus. Nunc blandit elit id scelerisque mollis. Nulla id hendrerit nunc. Sed vel consequat diam. Duis quis sem sed tortor ultrices ullamcorper et vitae massa. Phasellus aliquam augue vitae auctor consectetur. Ut egestas nunc vel turpis imperdiet vestibulum. Nulla consectetur erat non porta fringilla. Sed egestas augue nec odio fermentum, at aliquet tellus ultricies. Pellentesque nec purus sapien.
                        </div>

                    </div>
                    <div className="abw_homeRight" >
                        <div className="abw_homePage_content">
                            <PagePreview title="Bowling" url="/bowling" description="Bla bla" icon="bowling.png"/>
                            <PagePreview title="Forge of E." url="/foe" description="Bla bla" icon="game.png"/>
                            <PagePreview title="Research" url="/research" description="Bla bla" icon="research.png"/>
                            <PagePreview title="Perso" url="/perso" description="Bla bla" icon="user.png"/>
                        </div>
                    </div>
                </div>
            </div>
            );

export default HomePage;