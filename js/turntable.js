/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function turntable(option) {
    this._init(option);
}
turntable.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.radius = option.radius || 0;
        this.data = option.data || [];
        this.back = option.back || "red";
        this.num = option.num;
        this.bgGroup = new Konva.Group({
            x: 0,
            y: 0
        })
        this.group = new Konva.Group({
            x: 0,
            y: 0
        })
        this.ron=360 * parseInt(Math.random() * 10)
        var outerRing = new Konva.Ring({
            x: this.x,
            y: this.y,
            innerRadius: this.radius,
            outerRadius: this.radius + 20,
            fill: this.back,
            shadowBlur: 10, //设置阴影的模糊级别
            shadowColor: 'black', //设置阴影的颜色
        })
        this.rectGroup = new Konva.Group({
            x: this.x,
            y: this.y,
        });
        this.pointGroup = new Konva.Group({
            x: this.x,
            y: this.y,
        });
        this.bgGroup.add(outerRing);
        var self = this;
        this.data.forEach(function (item, index) {
            var background = index % 2 == 0 ? "#ffb820" : "#ffcb3f";
            var angle = 360 / self.data.length;
            var wedge = new Konva.Wedge({
                x: 0,
                y: 0,
                radius: self.radius,
                angle: angle,
                fill: background,
                strokeWidth: 1,
                stroke: "#f8981b",
                rotation: 360 / self.data.length * index,
            });
            self.rectGroup.add(wedge);
            var complexText = new Konva.Text({
                x: self.radius*3/4* Math.cos(Math.PI / 180 * (360 / self.data.length * index)),
                y: self.radius*3/4* Math.sin(Math.PI / 180 * (360 /self.data.length * index)),
                text: item,
                fontSize: 14,
                fontFamily: 'Calibri',
                fill: self.back,
                width:self.radius*3/4,
                align: 'center',
                rotation: 360 / self.data.length * index + angle / 2 + 90
            });
            self.rectGroup.add(complexText);

        })
        var innerCircle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 28,
            fill: this.back
        })

        this.pointGroup.add(innerCircle);
        var hexagon = new Konva.RegularPolygon({
            x: 0,
            y: -20,
            sides: 3,
            radius: 30,
            fill:  this.back,
        });
        this.pointGroup.add(hexagon);
        this.group.add(this.bgGroup);
        this.group.add(this.rectGroup);
        this.group.add(this.pointGroup);
    },
    addToGroupOrLayer: function (layer) {
        layer.add(this.group);
    },
    
    changeVal: function () {
        var num = this.num % this.data.length;
        this.ron=this.ron+360 * parseInt(Math.random() * 10);
        var r = (num - 1) * 360 / this.data.length + this.ron;
        var self=this;
        this.rectGroup.to({
            rotation: r,
            duration: 3,
            easing: Konva.Easings.EaseInOut,
            onFinish: function(){
                alert("恭喜您， 您获得"+self.data[self.num-1])
            },
        })
    
    }
}