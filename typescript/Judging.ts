function judging(): void {
	if ((s12Premiere || porkchopPremiere) && premiereCounter <= 2) {
		//add 2 queens to the top and the rest is safe
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		topQueens.push(currentCast[0]);
		topQueens.push(currentCast[1]);

		for (let i = 0; i < currentCast.length; i++) {
			if (topQueens.indexOf(currentCast[i]) == -1)
				currentCast[i].addToTrackRecord("SAFE"); 
		}

		doublePremiereJudging();
	}
	else if (currentCast.length > 5 && team) {
		//add 2 teams to the top and 3 teams to the bottom
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		topQueens.push(currentCast[0]);
		topQueens.push(currentCast[1]);

		bottomQueens.push(currentCast[currentCast.length - 1]);
		bottomQueens.push(currentCast[currentCast.length - 2]);
		bottomQueens.push(currentCast[currentCast.length - 3]);

		judgingScreen();
	} else if (currentCast.length == 5 && team) {
		//add 2 teams to the top and 3 teams to the bottom
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		topQueens.push(currentCast[0]);
		topQueens.push(currentCast[1]);

		bottomQueens.push(currentCast[currentCast.length - 1]);
		bottomQueens.push(currentCast[currentCast.length - 2]);
		bottomQueens.push(currentCast[currentCast.length - 3]);

		teamWinAndBtm2();
	} else if (currentCast.length == 4 && team) {
		//add 2 teams to the top and 2 teams to the bottom
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		topQueens.push(currentCast[0]);
		topQueens.push(currentCast[1]);

		bottomQueens.push(currentCast[currentCast.length - 1]);
		bottomQueens.push(currentCast[currentCast.length - 2]);

		teamWinAndBtm2();
	} else if (currentCast.length == 3 && team) {
		//add 1 team to the top and 2 teams to the bottom
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		topQueens.push(currentCast[0]);

		bottomQueens.push(currentCast[currentCast.length - 1]);
		bottomQueens.push(currentCast[currentCast.length - 2]);
		teamWinAndBtm2();
	}
	else if (currentCast.length > 13) {
		//add 4 queens to the top and 4 queens to the bottom
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		for (let i = 0; i < 4; i++) {
			topQueens.push(currentCast[i]);
			bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
		}

		judgingScreen();
	}
	else if (currentCast.length > 6) {
		//add first 3 queens to the top and last 3 queens to the bottom:
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		for (let i = 0; i < 3; i++) {
			topQueens.push(currentCast[i]);
			bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
		}

		judgingScreen();
	}
	else if (currentCast.length <= 6 && lipsync_assassin) {
		//add 1 queen to the top and the rest to the btm
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));

		topQueens.push(currentCast[0]);

		for (let i = 0; i < currentCast.length; i++) {
			if (topQueens.indexOf(currentCast[i]) == -1) {
				bottomQueens.push(currentCast[i]);
			}
		}

		topAndBtm();
	}
	else if (currentCast.length == 6) {
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		for (let i = 0; i < 3; i++) {
			topQueens.push(currentCast[i]);
			bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
		}

		if (top3 || top4)
			winAndBtm2();
		else if (all_stars)
			top2AndBtm();
		else if (lipsync_assassin)
			topAndBtm();
	}
	else if (currentCast.length == 5) {
		//add first 2 queens to the top and last 3 queens to the bottom:
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		topQueens.push(currentCast[0]);
		topQueens.push(currentCast[1]);

		if (currentCast[2].performanceScore >= 6 && currentCast[2].performanceScore < 16 && !all_stars)
			topQueens.push(currentCast[2]);
		else
			bottomQueens.push(currentCast[2]);
		
		bottomQueens.push(currentCast[3]);
		bottomQueens.push(currentCast[4]);

		if (top3 || top4)
			winAndBtm2();
		else if (all_stars)
			top2AndBtm();
		else if (lipsync_assassin)
			topAndBtm();
	}
	else if (currentCast.length == 4) {
		//add first 2 queens to the top and last 2 queens to the bottom:
		currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
		topQueens.push(currentCast[0]);
		topQueens.push(currentCast[1]);

		bottomQueens.push(currentCast[2]);
		bottomQueens.push(currentCast[3]);

		if (top3 || top4)
			winAndBtm2();
		else if (all_stars)
			top2AndBtm();
		else if (lipsync_assassin)
			topAndBtm();
	}
}

function judgingScreen() {
	let judgingScreen = new Scene();

	judgingScreen.clean();
	judgingScreen.createHeader("Judging!");
	judgingScreen.createBold("Based on tonight's performances...");

	if (team == true) {
		judgingScreen.createBold(topQueens[0].getName());
		judgingScreen.createBold(topQueens[1].getName());

		judgingScreen.createBold(bottomQueens[0].getName());
		judgingScreen.createBold(bottomQueens[1].getName());
		judgingScreen.createBold(bottomQueens[2].getName());
	}
	else
		for (let i = 0; i < topQueens.length; i++) {
			judgingScreen.createBold(topQueens[i].getName());
			judgingScreen.createBold(bottomQueens[i].getName());
		}

	judgingScreen.createBold("You are the tops and bottoms of the week.");
	judgingScreen.createHorizontalLine();

	judgingScreen.createParagraph("", "safeQueens");
	let safeQueens = document.querySelector("p#safeQueens");

	//check if the queen is in the top or in the bottom, and if not put her as safe:
	for (let i = 0; i < currentCast.length; i++) 
		if (topQueens.indexOf(currentCast[i]) == -1 && bottomQueens.indexOf(currentCast[i]) == -1) {
			safeQueens!.innerHTML += currentCast[i].getName() + ", ";
			if (team == false)
				currentCast[i].addToTrackRecord("SAFE");
			if (team == true) {
				(currentCast as Array<Team>)[i].QueenA.addToTrackRecord("SAFE");
				(currentCast as Array<Team>)[i].QueenB.addToTrackRecord("SAFE");
			}
		}

	safeQueens!.innerHTML += "you are safe.";

	if (top3 || top4)
		judgingScreen.createButton("Proceed", "winAndBtm2()");
	else if (all_stars)
		judgingScreen.createButton("Proceed", "top2AndBtm()")
	else if (lipsync_assassin)
		judgingScreen.createButton("Proceed", "topAndBtm()");
	else if (team)
		judgingScreen.createButton("Proceed", "teamWinAndBtm2()");
}

function winAndBtm2() {
	let screen = new Scene();

	screen.clean();
	screen.createHeader("Bring back my girls!");

	screen.createBold("Ladies, I've made some decisions...");

	//sort the top queens now taking runway and favoritism in consideration:
	for (let i = 0; i < topQueens.length; i++)
		topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
	topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
	
	//double win:

	if (topQueens[0].performanceScore == topQueens[1].performanceScore && randomNumber(0, 100) < 60) {
		topQueens[0].addToTrackRecord(" WIN");
		topQueens[0].favoritism += 5;
		topQueens[1].addToTrackRecord(" WIN");
		topQueens[1].favoritism += 5;


		screen.createBold(topQueens[0].getName() + ", " + topQueens[1].getName() + ", condragulations, you're the winners of today's challenge!");

		topQueens.splice(0, 2);
	} else {
		topQueens[0].addToTrackRecord("WIN");
		topQueens[0].favoritism += 5;

		screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge!");

		topQueens.splice(0, 1);	
	}

	screen.createParagraph("", "highs");
	let highs = document.querySelector("p#highs");

	for (let i = 0; i < topQueens.length; i++) {
		highs!.innerHTML += topQueens[i].getName() + ", ";
		topQueens[i].addToTrackRecord("HIGH");
	}

	if (topQueens.length > 0)
		highs!.innerHTML += "good work this week, you're safe.";

	screen.createHorizontalLine();

	screen.createParagraph("", "bottom3");

	if (bottomQueens.length >= 3) {
		let bottom3 = document.querySelector("p#bottom3");
		for (let i = 0; i < bottomQueens.length; i++)
			bottom3!.innerHTML += bottomQueens[i].getName() + ", ";
		bottom3!.innerHTML += "you're the bottoms of the week..."
	}

	//do the same, but for the bottom queens:
	if (bottomQueens.length == 4) {
		for (let i = 0; i < topQueens.length; i++)
			bottomQueens[i].performanceScore -= (bottomQueens[i].runwayScore - bottomQueens[i].favoritism);
		bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
		bottomQueens[0].addToTrackRecord("LOW");
		bottomQueens[1].addToTrackRecord("LOW");

		screen.createBold(bottomQueens[0].getName() + ", " + bottomQueens[1].getName() + "... you are safe.");
		bottomQueens[0].unfavoritism += 1;
		bottomQueens[1].unfavoritism += 1;

		bottomQueens.splice(0, 2);
	}
	else if (bottomQueens.length == 3) {
		for (let i = 0; i < topQueens.length; i++)
			bottomQueens[i].performanceScore -= (bottomQueens[i].runwayScore - bottomQueens[i].favoritism);
		bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
		bottomQueens[0].addToTrackRecord("LOW");

		screen.createBold(bottomQueens[0].getName() + "... you are safe.");
		bottomQueens[0].unfavoritism += 1;

		bottomQueens.splice(0, 1);
	}

	screen.createBold("", "btm2");
	let btm2 = document.querySelector("b#btm2");

	for (let i = 0; i < bottomQueens.length; i++) {
		btm2!.innerHTML += bottomQueens[i].getName() + ", ";
	}

	btm2!.innerHTML += "I'm sorry my dears but you are up for elimination.";

	screen.createButton("Proceed", "lipSync()")
}

function teamWinAndBtm2() {
	let screen = new Scene();

	screen.clean();
	screen.createHeader("Bring back my All Stars!");
	screen.createBold("Ladies, I've made some decisions...");

	//sort the top queens now taking runway and favoritism in consideration:
	for (let i = 0; i < topQueens.length; i++)
		topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
	topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));

	(topQueens as Array<Team>)[0].QueenA.addToTrackRecord("WIN");
	(topQueens as Array<Team>)[0].QueenB.addToTrackRecord("WIN");

	topQueens[0].favoritism += 5;

	screen.createBold(topQueens[0].getName() + ", condragulations you're the winners of this week's challenge!");

	if (topQueens.length > 1) {
		(topQueens as Array<Team>)[1].QueenA.addToTrackRecord("HIGH");
		(topQueens as Array<Team>)[1].QueenB.addToTrackRecord("HIGH");

		screen.createParagraph(topQueens[1].getName() + ", good work this week, you're safe.");	
	}

	screen.createHorizontalLine();

	if (bottomQueens.length > 2) {
		screen.createParagraph(`${bottomQueens[0].getName()}, ${bottomQueens[1].getName()}, ${bottomQueens[2].getName()}, you're the bottoms of the week...`);

		for (let i = 0; i < topQueens.length; i++)
			bottomQueens[i].performanceScore -= (bottomQueens[i].runwayScore - bottomQueens[i].favoritism);
		bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));

		(bottomQueens as Array<Team>)[0].QueenA.addToTrackRecord("LOW");
		(bottomQueens as Array<Team>)[0].QueenB.addToTrackRecord("LOW");

		bottomQueens[0].unfavoritism += 1

		screen.createBold(bottomQueens[0].getName() + ", you are safe.");

		bottomQueens.splice(0, 1);
	}

	screen.createBold(`${bottomQueens[0].getName()}, ${bottomQueens[1].getName()}, I'm sorry my dears but you are up for elimination.`)

	screen.createButton("Proceed", "teamLipSync()");
}

function top2AndBtm() {
	let screen = new Scene();
	screen.clean()

	screen.createHeader("Bring back my All Stars!");
	screen.createBold("Ladies, I've made some decisions...");

	//sort the top queens now taking runway and favoritism in consideration:
	for (let i = 0; i < topQueens.length; i++)
		topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
	topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));

	top2.push(topQueens[0]);
	top2.push(topQueens[1]);

	topQueens.splice(0, 2);

	screen.createBold(top2[0].getName() + ", " + top2[1].getName() + ", condragulations, you're the Top 2 of the week!");
	screen.createParagraph("", "highs");
	let highs = document.querySelector("p#highs");

	for (let i = 0; i < topQueens.length; i++) {
		highs!.innerHTML += topQueens[i].getName() + ", ";
		topQueens[i].addToTrackRecord("HIGH");
	}

	if (topQueens.length > 0)
		highs!.innerHTML += "good work this week, you're safe.";

	screen.createHorizontalLine();
	screen.createBold("", "bottoms")
	let bottoms = document.querySelector("b#bottoms")

	for (let i = 0; i < bottomQueens.length; i++) {
		bottoms!.innerHTML += bottomQueens[i].getName() + ", ";
	}
	bottoms!.innerHTML += "I'm sorry my dears but you're the bottoms of the week.";

	for (let i = 0; i < bottomQueens.length; i++) {
		if (bottomQueens[i].performanceScore >= 6 && bottomQueens[i].performanceScore < 16) {
			screen.createParagraph(bottomQueens[i].getName() + ", you are safe.");
			bottomQueens[i].addToTrackRecord("LOW");
			bottomQueens.splice(bottomQueens.indexOf(bottomQueens[i]), 1);

			screen.createBold(bottomQueens[0].getName() + ", " + bottomQueens[1].getName() + ", you're up for elimination.");
			break;
		}
	}

	screen.createHorizontalLine();
	screen.createBigText("After deliberation...");

	for (let i = 0; i < top2.length; i++) {
		if (randomNumber(0, 100) <= 45 && currentCast.length <= totalCastSize - 2)
			top2[i].lipstick = bottomQueens.sort((a, b) => b.unfavoritism - a.unfavoritism)[0]
		else
			top2[i].lipstick = bottomQueens[randomNumber(0, bottomQueens.length -1)];

		screen.createBold(top2[i].getName() + " chose " + top2[i].lipstick.getName() + "'s lipstick!");
	}

	screen.createButton("Proceed", "asLipSync()");
}

function topAndBtm() {
	let screen = new Scene();
	screen.clean()

	screen.createHeader("Bring back my All Stars!");
	screen.createBold("Ladies, I've made some decisions...");

	//sort the top queens now taking runway and favoritism in consideration:
	for (let i = 0; i < topQueens.length; i++)
		topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
	topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));

	top2.push(topQueens[0]);

	top2[0].favoritism += 5;

	topQueens.splice(0, 1);

	screen.createBold(top2[0].getName() + ", condragulations, you're the Top All Star of the week!");
	screen.createParagraph("", "highs");
	let highs = document.querySelector("p#highs");

	for (let i = 0; i < topQueens.length; i++) {
		highs!.innerHTML += topQueens[i].getName() + ", ";
		topQueens[i].addToTrackRecord("HIGH");
	}

	if (topQueens.length > 0)
		highs!.innerHTML += "good work this week, you're safe.";

	screen.createHorizontalLine();
	screen.createBold("", "bottoms")
	let bottoms = document.querySelector("b#bottoms")

	for (let i = 0; i < bottomQueens.length; i++) {
		bottoms!.innerHTML += bottomQueens[i].getName() + ", ";
	}
	bottoms!.innerHTML += "I'm sorry my dears but you're the bottoms of the week.";

	for (let i = 0; i < bottomQueens.length; i++) {
		if (bottomQueens[i].performanceScore >= 6 && bottomQueens[i].performanceScore < 16 && currentCast.length > 6) {
			screen.createParagraph(bottomQueens[i].getName() + ", you are safe.");
			bottomQueens[i].addToTrackRecord("LOW");
			bottomQueens.splice(bottomQueens.indexOf(bottomQueens[i]), 1);

			screen.createBold(bottomQueens[0].getName() + ", " + bottomQueens[1].getName() + ", you're up for elimination.");
			break;
		}
	}

	screen.createHorizontalLine();
	screen.createBigText("After deliberation...");

	if (randomNumber(0, 100) <= 45 && currentCast.length <= totalCastSize - 2)
		top2[0].lipstick = bottomQueens.sort((a, b) => b.unfavoritism - a.unfavoritism)[0]
	else
		top2[0].lipstick = bottomQueens[randomNumber(0, bottomQueens.length -1)];

	screen.createBold(top2[0].getName() + " chose " + top2[0].lipstick.getName() + "'s lipstick!");

	screen.createHorizontalLine();
	screen.createBigText("The queens vote...");

	for (let i = 0; i < currentCast.length; i++) {
		if (top2.indexOf(currentCast[i]) == -1) {
			if (randomNumber(0, 100) <= 15 && currentCast.length > 6 && bottomQueens.sort((a, b) => b.unfavoritism - a.unfavoritism)[0] != currentCast[i] && currentCast.length <= totalCastSize - 2)
				currentCast[i].lipstick = bottomQueens.sort((a, b) => b.unfavoritism - a.unfavoritism)[0]
			else
				currentCast[i].lipstick = bottomQueens[randomNumber(0, bottomQueens.length -1)];
			
			screen.createBold(currentCast[i].getName() + " voted for " + currentCast[i].lipstick.getName() + "!");
			currentCast[i].lipstick.votes++;
		}
	}

	screen.createHorizontalLine();
	for (let i = 0; i < bottomQueens.length; i++) {
		screen.createBold(bottomQueens[i].getName() + ": " + bottomQueens[i].votes.toString() + " votes");
	}

	bottomQueens.sort((a, b) => b.votes - a.votes);

	screen.createButton("Proceed", "lsaLipSync()");
}

function lipSync() {

	for (let i = 0; i < bottomQueens.length; i++) {
		bottomQueens[i].getLipsync();
	}
	bottomQueens.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));

	let screen = new Scene();
	screen.clean();
	screen.createHeader("It's time...");
	screen.createBold("For you to lip-sync... for your lives! Good luck, and don't fuck it up.");
	lsSong();
	screen.createHorizontalLine();

	screen.createBold("I've made my decision.");

	let score1 = bottomQueens[0].lipsyncScore - bottomQueens[0].favoritism + bottomQueens[0].unfavoritism;
	let score2 = bottomQueens[1].lipsyncScore - bottomQueens[0].favoritism + bottomQueens[0].unfavoritism;

	if (score1 > 7 && score2 > 7 && randomNumber(0, 100) <= 50 && !doubleShantay && noDouble == false && currentCast.length > 5){
		screen.createBold("Condragulations, shantay you both stay!!");
		bottomQueens[0].addToTrackRecord("BTM2");
		bottomQueens[0].unfavoritism += 5;

		bottomQueens[1].addToTrackRecord("BTM2");
		bottomQueens[1].unfavoritism += 5;

		doubleShantay = true;
	} else if (score1 < 4 && score2 < 4 && randomNumber(0, 100) <= 10 && !doubleSashay && currentCast.length > 5 && noDouble == false) {
		screen.createBold("I'm sorry but none of you showed the fire it takes to stay. You must both... sashay away.");
		doubleSashay = true;

		bottomQueens[0].addToTrackRecord("ELIM");
		eliminatedCast.unshift(bottomQueens[0]);
		currentCast.splice(currentCast.indexOf(bottomQueens[0]), 1);

		bottomQueens[1].addToTrackRecord("ELIM");
		eliminatedCast.unshift(bottomQueens[1]);
		currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
	} else if (randomNumber(0, 1000) >= 995) {
		let disqualifiedQueen: Queen = currentCast[randomNumber(0, currentCast.length - 1)];

		screen.createBold(disqualifiedQueen.getName() + ", it has come to my attention that you have broken the rules of this competition. I must ask you to sashay away.");

		bottomQueens[0].addToTrackRecord("BTM2");
		bottomQueens[0].unfavoritism += 5;

		bottomQueens[1].addToTrackRecord("BTM2");
		bottomQueens[1].unfavoritism += 5;

		disqualifiedQueen.trackRecord.pop();
		disqualifiedQueen.addToTrackRecord("DISQ");
		eliminatedCast.unshift(disqualifiedQueen);
		currentCast.splice(currentCast.indexOf(disqualifiedQueen), 1);

	} else {
		screen.createBold(bottomQueens[0].getName() + ", shantay you stay.");
		bottomQueens[0].addToTrackRecord("BTM2");
		bottomQueens[0].unfavoritism += 3;

		screen.createBold(bottomQueens[1].getName() + ", sashay away...");
		bottomQueens[1].addToTrackRecord("ELIM");
		eliminatedCast.unshift(bottomQueens[1]);
		currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
	}

	if ((s6Premiere || s12Premiere || porkchopPremiere) == true && premiereCounter < 3)
		screen.createButton("Proceed", "doublePremiere()");
	else if (CheckForReturning() == true && noReturn == false)
		screen.createButton("Proceed", "returningQueenScreen()")
	else
		screen.createButton("Proceed", "newEpisode()");
}

function teamLipSync() {
	let screen = new Scene();
	screen.clean()
	screen.createHeader("It's time...");
	screen.createBold("For you to lip-sync... for your lives! Good luck and don't fuck it up.");

	if (randomNumber(0, 100) <= 50)
		(bottomQueens as Array<Team>)[0].lipsyncQueen = (bottomQueens as Array<Team>)[0].QueenA;
	else
		(bottomQueens as Array<Team>)[0].lipsyncQueen = (bottomQueens as Array<Team>)[0].QueenB;
	
	if (randomNumber(0, 100) <= 50)
		(bottomQueens as Array<Team>)[1].lipsyncQueen = (bottomQueens as Array<Team>)[1].QueenA;
	else
		(bottomQueens as Array<Team>)[1].lipsyncQueen = (bottomQueens as Array<Team>)[1].QueenB;

	screen.createBold(`[${(bottomQueens as Array<Team>)[0].lipsyncQueen.getName()} and ${(bottomQueens as Array<Team>)[1].lipsyncQueen.getName()} will be lip-syncing]`);

	lsSong();

	(bottomQueens as Array<Team>)[0].lipsyncQueen.getLipsync();
	(bottomQueens as Array<Team>)[1].lipsyncQueen.getLipsync();

	(bottomQueens as Array<Team>).sort((a, b) => (a.lipsyncQueen.lipsyncScore - a.favoritism + a.unfavoritism) - (b.lipsyncQueen.lipsyncScore - b.favoritism + b.unfavoritism));

	screen.createHorizontalLine();

	screen.createBold((bottomQueens as Array<Team>)[0].lipsyncQueen.getName() + ", shantay you stay.");
	screen.createBold((bottomQueens as Array<Team>)[1].lipsyncQueen.getName() + ", you will always be an All Star, now, sashay away...");

	(bottomQueens as Array<Team>)[0].QueenA.addToTrackRecord("BTM2");
	(bottomQueens as Array<Team>)[0].QueenB.addToTrackRecord("BTM2");
	(bottomQueens as Array<Team>)[0].unfavoritism += 3;

	(bottomQueens as Array<Team>)[1].QueenA.addToTrackRecord("ELIM");
	(bottomQueens as Array<Team>)[1].QueenB.addToTrackRecord("ELIM");

	eliminatedCast.unshift((bottomQueens as Array<Team>)[1].QueenA);
	eliminatedCast.unshift((bottomQueens as Array<Team>)[1].QueenB);

	currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);

	screen.createButton("Proceed", "newEpisode()");
}

function asLipSync() {
	for (let i = 0; i < top2.length; i++) {
		top2[i].getASLipsync();
	}
	top2.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));

	let screen = new Scene();
	screen.clean();

	screen.createHeader("It's time...");
	screen.createBold("For you to lip-sync... for your legacy! Good luck, and don't fuck it up.");
	lsSong();
	screen.createHorizontalLine();
	screen.createBold("Ladies, I've made my decision...");

	if (top2[0].lipsyncScore == top2[1].lipsyncScore && top2[0].lipsyncScore > 7 && top2[1].lipsyncScore > 7 && currentCast.length > 5) {
		screen.createBold("Condragulations, you're both winners baby!");

		top2[0].favoritism += 5;
		top2[1].favoritism += 5;

		top2[0].addToTrackRecord(" WIN");
		top2[1].addToTrackRecord(" WIN");

		screen.createHorizontalLine();

		if (top2[0].lipstick == top2[1].lipstick) {
			screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);

			top2[0].lipstick.addToTrackRecord("ELIM");
			eliminatedCast.unshift(top2[0].lipstick);
			bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
			currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
		} else {
			screen.createBold(`${top2[0].lipstick.getName()}, ${top2[1].lipstick.getName()}, you will always be an All Star, now, sashay away...`)

			top2[0].lipstick.addToTrackRecord("ELIM");
			eliminatedCast.unshift(top2[0].lipstick);
			bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
			currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);

			top2[1].lipstick.addToTrackRecord("ELIM");
			eliminatedCast.unshift(top2[1].lipstick);
			bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
			currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
		}
	} else {
		top2[0].favoritism += 5;
		top2[0].addToTrackRecord("WIN");

		screen.createBold(top2[0].getName() + ", you're a winner, baby!");

		top2[1].addToTrackRecord("TOP2");
		top2[1].favoritism += 4;

		screen.createParagraph(top2[1].getName() + ", you are safe.");

		screen.createHorizontalLine();

		screen.createBold(top2[0].lipstick.getName() + ", you will always be an All Star, now, sashay away...");

		top2[0].lipstick.addToTrackRecord("ELIM");
		eliminatedCast.unshift(top2[0].lipstick);
		bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
		currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
	}
	

	for (let i = 0; i < bottomQueens.length; i++) {
		if (bottomQueens.length == 3)
			bottomQueens[i].addToTrackRecord("BTM4");
		else if (bottomQueens.length == 2)
			bottomQueens[i].addToTrackRecord("BTM3");
		else
			bottomQueens[i].addToTrackRecord("BTM2");

		bottomQueens[i].unfavoritism += 3;
	}

	if ((s6Premiere || s12Premiere || porkchopPremiere) == true && premiereCounter < 3)
		screen.createButton("Proceed", "doublePremiere()");
	else
		screen.createButton("Proceed", "newEpisode()");
}

function lsaLipSync() {
	let screen = new Scene();
	screen.clean();
	screen.createHeader("It's time to ruveal...");

	let assassin = allQueens[randomNumber(0, allQueens.length - 1)];
	bottomQueens.sort((a, b) => b.votes - a.votes);
	assassin.lipstick = bottomQueens[0];
	top2.push(assassin);

	screen.createBold("The lip-sync assassin is... " + assassin.getName() + "!");
	screen.createParagraph("Now, it's time for you to lip-sync... for your legacy!");
	lsSong();
	screen.createHorizontalLine();

	for (let i = 0; i < top2.length; i++) {
		top2[i].getASLipsync();
	}
	assassin.lipsyncScore -= 3;
	top2.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));

	screen.createBold(top2[0].getName() + ", you're a winner baby!")

	if (top2[0] == assassin) {
		screen.createParagraph(top2[1].getName() + ", you're safe.");
		top2[1].addToTrackRecord("WIN ");
	} else {
		screen.createParagraph(top2[1].getName() + ", thanks for participating.");
		top2[0].addToTrackRecord("WIN");
	}

	allQueens.splice(allQueens.indexOf(assassin), 1);

	screen.createHorizontalLine();

	screen.createBold(top2[0].lipstick.getName() + ", you will always be an All Star, now, sashay away...");

	top2[0].lipstick.addToTrackRecord("ELIM");
	eliminatedCast.unshift(top2[0].lipstick);
	bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
	currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);

	for (let i = 0; i < bottomQueens.length; i++) {
		if (bottomQueens.length == 4)
			bottomQueens[i].addToTrackRecord("BTM5");
		else if (bottomQueens.length == 3)
			bottomQueens[i].addToTrackRecord("BTM4");
		else if (bottomQueens.length == 2)
			bottomQueens[i].addToTrackRecord("BTM3");
		else
			bottomQueens[i].addToTrackRecord("BTM2");

		bottomQueens[i].unfavoritism += 2;
		bottomQueens[i].votes = 0;
	}

	if ((s6Premiere || s12Premiere || porkchopPremiere) == true && premiereCounter < 3)
		screen.createButton("Proceed", "doublePremiere()");
	else
		screen.createButton("Proceed", "newEpisode()");
}