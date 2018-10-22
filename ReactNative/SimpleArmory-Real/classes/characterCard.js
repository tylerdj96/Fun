import React from 'react';
export default class CharacterCard {
    constructor(){
        this.name = "";
        this.realm = "";
        this.class = "";
        this.race = "";
        this.gender = "";
        this.level = "";
        this.thumbnail = "";
        this.faction = "";
        this.totalHonorableKills = "";
    };

    get name(){
        return this.name;
    }

    set name(myName){
        this.name = myName;
    }

    get realm(){
        return this.realm;
    }

    set realm(myName){
        this.realm = myName;
    }
    get class(){
        return this.class;
    }

    set class(myName){
        this.class = myName;
    }
    get race(){
        return this.race;
    }

    set race(myName){
        this.race = myName;
    }
    get gender(){
        return this.gender;
    }

    set gender(myName){
        this.gender = myName;
    }
    get thumbnail(){
        return this.thumbnail;
    }

    set thumbnail(myName){
        this.thumbnail = myName;
    }
    get faction(){
        return this.faction;
    }

    set faction(myName){
        this.faction = myName;
    }
    get level(){
        return this.level;
    }

    set level(myName){
        this.level = myName;
    }
    get totalHonorableKills(){
        return this.totalHonorableKills;
    }

    set totalHonorableKills(myName){
        this.totalHonorableKills = myName;
    }
};
