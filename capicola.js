
Game.updateGrimoire = false;
Game.registerMod("Capicola", {
    init: function () {

        let img = "img/C.png"
        Game.banned = 0;

        Game.registerHook('check', () => {
            if (Game.Objects['Farm'].minigameLoaded && !Game.updateGrimoire) {
                let M = Game.Objects['Wizard tower'].minigame;
                eval("Game.Objects['Wizard tower'].minigame.spellTooltip=" + replaceAll('M.', 'M.', M.spellTooltip.toString()));
                eval("Game.Objects['Wizard tower'].minigame.spellTooltip=" + Game.Objects['Wizard tower'].minigame.spellTooltip.toString().replace(`background-position:'+(-me.icon[0]*48)+'px '+(-me.icon[1]*48)+'px;`, `'+writeIcon(me.icon)+'`));
        
                Game.Objects['Wizard tower'].minigame.spells['Capicola'] = {
                    name: 'Capicola',
                    desc: 'Win the game.',
                    failDesc: 'Forces an ascension, and bans you from using grimoire.',
                    icon: [0, 0, img],
                    costMin: 24,
                    costPercent: 0.78,
                    id: 9,
                    failFunc: function (fail) {
                        return fail + 0.80;
                    },
                    win: function () {
                        Game.gainBuff('frenzy', Math.ceil(77 * 2.222), 7);
                        Game.gainBuff('dragon harvest', Math.ceil(60 * 2.222), 15);
        
                        var time = Math.ceil(30 * 2.222);
                        var list = [];
                        for (var i in Game.Objects) {
                            if (Game.Objects[i].amount >= 10) list.push(Game.Objects[i].id);
                        }
                        if (list.length == 0) { choice = 'frenzy'; }//default to frenzy if no proper building
                        else {
                            var obj = choose(list);
                            var pow = Game.ObjectsById[obj].amount / 10 + 1;
                            Game.gainBuff('building buff', time, pow, obj);
                        }
                        Game.gainBuff('dragonflight', Math.ceil(10 * 2.222), 1111);
                        Game.gainBuff('click frenzy', Math.ceil(13 * 2.222), 777);
                        Game.gainBuff('blood frenzy', Math.ceil(30 * 2.222), 666);
        
                        Game.Popup('<div style="font-size:80%;">Capicola!</div>', Game.mouseX, Game.mouseY);
                    },
                    fail: function () {
        
                        Game.Ascend(1);
                        Game.banned = 1;
        
                        Game.Achievements['Seven horseshoes'].won = 0;
                        Game.goldenClicks = 0;
        
                        Game.Achievements['Gaseous assets'].won = 0;
                        if (Game.Objects['Bank'].minigameLoaded) {
                            Game.Objects['Bank'].minigame.profit = 0;
                        }
                    }
                }
                Game.Objects['Wizard tower'].minigame.spellsById.push(Game.Objects['Wizard tower'].minigame.spells['Capicola']);
        
                eval("Game.Objects['Wizard tower'].minigame.castSpell=" + Game.Objects['Wizard tower'].minigame.castSpell.toString().replace(`if (M.magic<cost)`, `if (M.magic<cost || Game.banned == 1)`));
        
                Game.changeGrimoire = function () {
        
                    let M = Game.Objects['Wizard tower'].minigame;
                    var str = '';
                    str += '<style>' +
                        '#grimoireBG{background:url(' + Game.resPath + 'img/shadedBorders.png),url(' + Game.resPath + 'img/BGgrimoire.jpg);background-size:100% 100%,auto;position:absolute;left:0px;right:0px;top:0px;bottom:16px;}' +
                        '#grimoireContent{position:relative;box-sizing:border-box;padding:4px 24px;}' +
                        '#grimoireBar{max-width:95%;margin:4px auto;height:16px;}' +
                        '#grimoireBarFull{transform:scale(1,2);transform-origin:50% 0;height:50%;}' +
                        '#grimoireBarText{transform:scale(1,0.8);width:100%;position:absolute;left:0px;top:0px;text-align:center;color:#fff;text-shadow:-1px 1px #000,0px 0px 4px #000,0px 0px 6px #000;margin-top:2px;}' +
                        '#grimoireSpells{text-align:center;width:100%;padding:8px;box-sizing:border-box;}' +
                        '.grimoireIcon{pointer-events:none;margin:2px 6px 0px 6px;width:48px;height:48px;opacity:0.8;position:relative;}' +
                        '.grimoirePrice{pointer-events:none;}' +
                        '.grimoireSpell{box-shadow:4px 4px 4px #000;cursor:pointer;position:relative;color:#f33;opacity:0.8;text-shadow:0px 0px 4px #000,0px 0px 6px #000;font-weight:bold;font-size:12px;display:inline-block;width:60px;height:74px;background:url(' + Game.resPath + 'img/spellBG.png);}' +
                        '.grimoireSpell.ready{color:rgba(255,255,255,0.8);opacity:1;}' +
                        '.grimoireSpell.ready:hover{color:#fff;}' +
                        '.grimoireSpell:hover{box-shadow:6px 6px 6px 2px #000;z-index:1000000001;top:-1px;}' +
                        '.grimoireSpell:active{top:1px;}' +
                        '.grimoireSpell.ready .grimoireIcon{opacity:1;}' +
                        '.grimoireSpell:hover{background-position:0px -74px;} .grimoireSpell:active{background-position:0px 74px;}' +
                        '.grimoireSpell:nth-child(4n+1){background-position:-60px 0px;} .grimoireSpell:nth-child(4n+1):hover{background-position:-60px -74px;} .grimoireSpell:nth-child(4n+1):active{background-position:-60px 74px;}' +
                        '.grimoireSpell:nth-child(4n+2){background-position:-120px 0px;} .grimoireSpell:nth-child(4n+2):hover{background-position:-120px -74px;} .grimoireSpell:nth-child(4n+2):active{background-position:-120px 74px;}' +
                        '.grimoireSpell:nth-child(4n+3){background-position:-180px 0px;} .grimoireSpell:nth-child(4n+3):hover{background-position:-180px -74px;} .grimoireSpell:nth-child(4n+3):active{background-position:-180px 74px;}' +
        
                        '.grimoireSpell:hover .grimoireIcon{top:-1px;}' +
                        '.grimoireSpell.ready:hover .grimoireIcon{animation-name:bounce;animation-iteration-count:infinite;animation-duration:0.8s;}' +
                        '.noFancy .grimoireSpell.ready:hover .grimoireIcon{animation:none;}' +
        
                        '#grimoireInfo{text-align:center;font-size:11px;margin-top:12px;color:rgba(255,255,255,0.75);text-shadow:-1px 1px 0px #000;}' +
                        '</style>';
                    str += '<div id="grimoireBG"></div>';
                    str += '<div id="grimoireContent">';
                    str += '<div id="grimoireSpells">';
                    for (var i in M.spells) {
                        var me = M.spells[i];
                        var icon = me.icon || [28, 12];
                        str += '<div class="grimoireSpell titleFont" id="grimoireSpell' + me.id + '" ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.spellTooltip(' + me.id + ')', 'this') + '><div class="usesIcon shadowFilter grimoireIcon" style="' + writeIcon(icon) + '"></div><div class="grimoirePrice" id="grimoirePrice' + me.id + '">-</div></div>';
                    }
                    str += '</div>';
                    var icon = [29, 14];
                    str += '<div id="grimoireBar" class="smallFramed meterContainer" style="width:1px;"><div ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.refillTooltip', 'this') + ' id="grimoireLumpRefill" class="usesIcon shadowFilter lumpRefill" style="left:-40px;top:-17px;background-position:' + (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px;"></div><div id="grimoireBarFull" class="meter filling" style="width:1px;"></div><div id="grimoireBarText" class="titleFont"></div><div ' + Game.getTooltip('<div style="padding:8px;width:300px;font-size:11px;text-align:center;">' + loc("This is your magic meter. Each spell costs magic to use.<div class=\"line\"></div>Your maximum amount of magic varies depending on your amount of <b>Wizard towers</b>, and their level.<div class=\"line\"></div>Magic refills over time. The lower your magic meter, the slower it refills.") + '</div>') + ' style="position:absolute;left:0px;top:0px;right:0px;bottom:0px;"></div></div>';
                    str += '<div id="grimoireInfo"></div>';
                    str += '</div>';
                    l('rowSpecial7').innerHTML = str;
                    M.magicBarL = l('grimoireBar');
                    M.magicBarFullL = l('grimoireBarFull');
                    M.magicBarTextL = l('grimoireBarText');
                    M.lumpRefill = l('grimoireLumpRefill');
                    M.infoL = l('grimoireInfo');
                    for (var i in M.spells) {
                        var me = M.spells[i];
                        AddEvent(l('grimoireSpell' + me.id), 'click', function (spell) { return function () { PlaySound('snd/tick.mp3'); M.castSpell(spell); if (Game.banned == 1) { Game.Popup('<div style="font-size:80%;"> Capicola bans you from grimoire!<br> You must get seven horseshoes and gaseous assets to be unbanned.</div>', Game.mouseX, Game.mouseY); } } }(me));
                    }
                    AddEvent(M.lumpRefill, 'click', function () {
                        if (M.magic < M.magicM) {
                            Game.refillLump(1, function () {
                                M.magic += 100;
                                M.magic = Math.min(M.magic, M.magicM);
                                PlaySound('snd/pop' + Math.floor(Math.random() * 3 + 1) + '.mp3', 0.75);
                            });
                        }
                    });
                }
        
                Game.changeGrimoire();

                Game.updateGrimoire = true;
            }
        });

        Game.ExportSave = () => { Game.Popup('<div style="font-size:80%;">Capicola hates save scummers!</div>', Game.mouseX, Game.mouseY); }
        Game.ImportSave = () => { Game.Popup('<div style="font-size:80%;">Capicola hates save scummers!</div>', Game.mouseX, Game.mouseY); }

        Game.FileLoad = () => { Game.Popup('<div style="font-size:80%;">Capicola hates save scummers!</div>', Game.mouseX, Game.mouseY); }
        Game.FileSave = () => { Game.Popup('<div style="font-size:80%;">Capicola hates save scummers!</div>', Game.mouseX, Game.mouseY); }

        
        Game.registerHook('check', () => {
            if (Game.HasAchiev('Seven horseshoes') && Game.HasAchiev('Gaseous assets')) Game.banned = 0;
        });


    },
    save: function () {
        let str = "";
        str += Game.banned;

        return str;
    },
    load: function (str) {
        console.log(str)
        Game.banned = parseInt(str[0]);
    }
});
