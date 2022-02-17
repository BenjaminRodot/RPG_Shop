var itemCats = [ 'helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [

    {
        slot: 'head' ,
        limit: 1,
        types: ['helmet', 'crown'],
    },
    {
        slot: 'body',
        limit: 1,
        types: ['armor', 'clothes'],
    },
    {
        slot: 'hands',
        limit: 2,
        types: ['weapon', 'lighter'],
    },
    {
        slot: 'belt',
        limit: 3,
        types: ['weapon', 'purse'],
    },
    {
        slot: 'bag',
        limit: 10,
        types: ['helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse'],
    }
];


class Item {
    static counter = 0;
    constructor(name, type, price, effect) {
        this.id=Item.counter
        Item.counter++;
        this.name=name;
        if(itemCats.includes(type))
            this.type=type;
        else
            this.type="";

        if (price<0)
            price=0;
        this.price=price;
        this.effect=effect;
    }

    static fromJSON(obj) {
        let it = new Item(obj.name, obj.type, obj.price, obj.effect)
        it.id = obj.id
        return it
    }
}

var items = [
    new Item('conic helmet', 'helmet', 200, 'A+10'),
    new Item('great crown of apologia', 'crown', 200, 'A+20'),
    new Item('band of joy', 'crown', 100, 'L+10'),
    new Item('leather armor', 'armor', 100, 'A+10'),
    new Item('broigne', 'armor', 200, 'A+20'),
    new Item('hauberk', 'armor', 500, 'A+40'),
    new Item('plate armor', 'armor', 1000, 'A+60'),
    new Item('tuxedo', 'clothes', 600, 'L+1'),
    new Item('cursed swimsuit', 'clothes', 10, 'A-10'),
    new Item('unicorn cosplay', 'clothes', 200, 'L+10'),
    new Item('dagger', 'weapon', 100, 'S+5'),
    new Item('cursed dagger', 'weapon', 100, 'S-5'),
    new Item('short sword', 'weapon', 200, 'S+10'),
    new Item('cursed short sword', 'weapon', 200, 'S-10'),
    new Item('long sword', 'weapon', 300, 'S+20'),
    new Item('cursed long sword', 'weapon', 300, 'S-20'),
    new Item('axe', 'weapon', 100, 'S+10'),
    new Item('cursed axe', 'weapon', 100, 'S-10'),
    new Item('great axe', 'weapon', 200, 'S+20'),
    new Item('cursed great axe', 'weapon', 200, 'S-20'),
    new Item('torch', 'lighter', 2, ''),
    new Item('oil lamp', 'lighter', 10, ''),
    new Item('leather purse', 'purse', 10, ''),
    new Item('protection potion', 'potion', 100, 'a+10'),
    new Item('health potion', 'potion', 100, 'l+10'),
    new Item('strength potion', 'potion', 100, 's+10'),
    new Item('fireball', 'spell', 1000, ''),
    new Item('ice cone', 'spell', 1000, ''),
    new Item('total healing', 'spell', 1000, ''),
    new Item('invisibility', 'spell', 1000, ''),
    new Item('levitation', 'spell', 1000, ''),
    new Item('apple', 'food', 1, 'l+1'),
    new Item('chicken', 'food', 10, 'l+5'),
    new Item('beef', 'food', 15, 'l+10'),
    new Item('wine', 'food', 2, 'l+2')
];

class Slot {

    constructor(id, name) {
        this.id=id;
        this.name=name;
        this.items=[];
    }
    static fromJSON(obj) {
        let s = new Slot(obj.id, obj.name, obj.items)
        obj.items.forEach(e=>s.items.push(Item.fromJSON(e)));
        return s
    }
}

class Perso {

    static counter = 0;
    constructor(name, level) {
        this.id=Perso.counter;
        Perso.counter++;
        this.name=name;
        this.level=level;
        this.vitality=50*level;
        this.life=this.vitality;
        this.strength=20*level;
        this.armor=0;
        this.gold=450;
        this.slots=[ new Slot(1,"head"),new Slot(2,"body"),
            new Slot(3,"hands"), new Slot(4,"belt"),
            new Slot(5,"bag")];
        this.boughtItems=[];
    }


    buy(item) {
        if(this.gold<item.price)
            return "You don't have enough gold, peasant !";
        else{
            this.boughtItems.push(item);
            this.gold-=item.price;
            return  "";
        }
    }

    sell( slotIndex, itemIndex, price) {
        this.slots[slotIndex].items.splice(itemIndex,1)
        this.gold += price
    }

    assign(boughtItemIndex, slotIndex) {
        if (itemLimits[slotIndex].limit===this.slots[slotIndex].items.length){
            return("Le slot "+itemLimits[slotIndex].slot+" est deja plein...");
        }
        else if(!itemLimits[slotIndex].types.includes(this.boughtItems[boughtItemIndex].type))
            return("Vous ne pouvez pas mettre un item de type "+this.boughtItems[boughtItemIndex].type+
                " dans un slot de type "+this.slots[slotIndex].name);
        else{
            this.slots[slotIndex].items.push(this.boughtItems[boughtItemIndex]);
            this.boughtItems.splice(boughtItemIndex,1);
            return ""
        }
    }

    unassign(itemIndex,slotIndex){
        console.log(itemIndex,slotIndex)
        let item = this.slots[slotIndex].items[itemIndex];
        this.boughtItems.push(item);
        this.slots[slotIndex].items.splice(itemIndex,1);
        return "";
    }

    static fromJSON(obj) {
        let p = new Perso(obj.name, obj.level);
        obj.boughtItems.forEach(b=>p.boughtItems.push(Item.fromJSON(b)));
        obj.slot.forEach(s=>p.slots.push(Slot.fromJSON(s)));
        return p
    }
}

class Shop {

    static counter = 0;
    constructor(name, itemCat) {
        this.id=Shop.counter;
        Shop.counter++;
        this.name=name;
        this.itemCat=itemCat;
        this.itemStock=[];
        this.itemOrder=[];

        this.fillStock();
        this.fillOrder();
    }

    fillStock(){
        let nbItem =0;
        while( nbItem<10){
            let index = Math.floor(Math.random()*items.length);
            if (this.itemCat.includes(items[index].type)){
                this.itemStock.push(items[index]);
                nbItem++;
            }
        }
    }

    fillOrder(){
        for(let i=0;i<5;i++){
            let index = Math.floor(Math.random()*items.length);
            if (this.itemCat.includes(items[index].type) && !this.itemStock.includes(items[index]))
                this.itemOrder.push(items[index]);
        }
    }

    sell(item_id){
        this.itemStock.splice(item_id,1);
    }

    estimate(item){
        if(!this.itemCat.includes(item.type))
            return -1;
        let coef = Math.floor(Math.random()*9)/10;
        return item.price*(1-coef);
    }

    buy(item){
        this.itemStock.push(item);
    }

    order(item_id){
        this.itemStock.push(this.itemOrder[item_id]);
    }

    static fromJSON(obj) {
        let s = new Shop(obj.id, obj.name, obj.itemCat)
        obj.itemStock.forEach(i=>s.itemStock.push(Item.fromJSON(i)))
        obj.itemOrder.forEach(i=>s.itemOrder.push(Item.fromJSON(i)))
        obj.itemCat.forEach(i=>s.itemCat.push(Item.fromJSON(i)))
        return s
    }
}

class Street {

    static counter = 0;

    constructor(name, shops) {
        this.id = Street.counter;
        Street.counter++;
        this.name = name;
        this.shops = shops;
    }

    addShop(shop){
        this.shops.push(shop);
    }

    static fromJSON(obj) {
        let street = new Street(obj.id, obj.name, obj.shops)
        obj.shops.forEach(shop=>street.shops.push(Item.fromJSON(shop)))
        return street
    }
}

class Town {

    static counter = 0;

    constructor(name, streets) {
        this.id = Shop.counter;
        Shop.counter++;
        this.name = name;
        this.streets = streets;
    }

    addStreet(street){
        this.streets.push(street);
    }

    static fromJSON(obj) {
        let town = new Town(obj.id, obj.name, obj.streets)
        obj.streets.forEach(street=>town.streets.push(Item.fromJSON(street)))
        return town
    }
}

var players = [
    new Perso("Conan",1),
    new Perso("Xena",2),
    new Perso("Le Pyrobarbare",10),
];

players[1].life=players[1].vitality*0.4
players[2].life=players[2].vitality*0.7

let cat1 = [ 'helmet', 'armor', 'weapon' ];
let cat2 = [ 'clothes', 'purse', 'food', 'lighter' ];
let cat3 = [ 'crown', 'spell', 'potion' ];

var shops=[
    new Shop("Dodge Death",cat1),
    new Shop("Bigger Dagger, Smaller Money",cat1),
    new Shop("Kratos Mommy",cat1),

    new Shop("No longer naked",cat2),
    new Shop("Eat and run",cat2),
    new Shop("Souls Dead",cat2),

    new Shop("MageVegas",cat3),
    new Shop("Potion Dream",cat3),
    new Shop("Witch Paradise",cat3),


    new Shop("Patty Smith",cat1),
    new Shop("I smith you",cat1),
    new Shop("Dingue de marteau",cat1),

    new Shop("My tailor is rich",cat2),
    new Shop("La grosse Erie",cat2),
    new Shop("Les Zoeurs",cat2),

    new Shop("Wizzz",cat3),
    new Shop("A Bric-a-brac dabra",cat3),
    new Shop("La bonne baguette",cat3),


    new Shop("Iron Maiden",cat1),
    new Shop("Alice Copper",cat1),

    new Shop("50 Shades of Beers",cat2),
];

var streets=[
    new Street("John Smith",[shops[0],shops[1],shops[2]]),
    new Street("Kingdom of Gourmets",[shops[3],shops[4],shops[5]]),
    new Street("ManAvenue",[shops[6],shops[7],shops[8]]),

    new Street("Smith Street",[shops[9],shops[10],shops[11]]),
    new Street("Quality Street",[shops[12],shops[13],shops[14]]),
    new Street("Magic Street",[shops[15],shops[16],shops[17]]),

    new Street("Sound of Metal",[shops[18],shops[19]]),
    new Street("Magic Street",[shops[20]])
]

var towns=[
    new Town("StormBreeze",[streets[0],streets[1],streets[2]]),
    new Town("Metropolis",[streets[3],streets[4],streets[5]]),
    new Town("RogueLand",[streets[6],streets[7]])
]

const town1 = towns[0];

export {towns,town1,players, Town, Street, Shop};