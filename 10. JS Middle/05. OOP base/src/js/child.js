import Character from './character';

export default class Child extends Character {
    constructor(name) {
        switch (type) {
            case 'Bowerman':
                super(name, 'Bowerman', 25, 25);
                break;
            case 'Daemon':
                super(name, 'Daemon', 10, 40);
                break;
            case 'Magician':
                super(name, 'Magician', 10, 40);
                break;
            case 'Swordsman':
                super(name, 'Swordsman', 40, 10);
                break;
            case 'Undead':
                super(name, 'Undead', 25, 25);
                break;
            case 'Zombie':
                super(name, 'Zombie', 40, 10);
                break;
        }
    }
}