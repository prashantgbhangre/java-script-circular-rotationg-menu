var $circle = new Array();
var position_degree = new Array();
var pre_position_degree = new Array();
var position = new Array();
var selectedCircle;
var speed = 800;
var rotation = -1; // -1 clockwise
var radiusOfCircle = 190;
var center = [409,359];
var initialStart = 0;

$( document ).ready(function() {
                   
    $circle = [$('#circle_1'),$('#circle_2'),$('#circle_3'),$('#circle_4'),$('#circle_5')];
    
    var count = 360/$circle.length;                
    
    for(i=0;i<$circle.length;i++)
    {
        position_degree[i] = 180 - (i * count); 
        position[i] = i+1;
        pre_position_degree[i] = 180 - (i * count);
    }
    
    selectedCircle = 'circle_1';

    for(i = 0 ; i < position_degree.length ; i++)
    {
        rotateAnimation($circle[i],center[0],center[1],radiusOfCircle,initialStart,position_degree[i],rotation,speed);
    }
    applyCssEffect();

});        

$(function() {
                
    /* when page loads animate the about section by default */
    //move($('#about'),2000,2);

    $('.circle').click(
        function(){
            var id = $(this).attr('id');
            if(id!=selectedCircle)
            {
                selectedCircle = id;
                // change images
                $('#image_'+id).stop(true,true).fadeIn(650).siblings().not(this).fadeOut(650);
                var selected_position = getPosition(selectedCircle);
                var current_degree = position_degree[selected_position-1];
                if(current_degree > 0 && current_degree < 180)
                {
                    if(current_degree > 90)
                    {
                        ShiftCircleBy90_Anticlockwise();
                        ShiftPositionBy90_Anticlockwise();
                        ShiftDegreeBy90_Anticlockwise();
                    }
                    if(current_degree < 90)
                    {
                        ShiftCircleBy90_Anticlockwise_1();
                        ShiftPositionBy90_Anticlockwise_1();
                        ShiftDegreeBy90_Anticlockwise_1();
                    }
                }
                else
                if(current_degree < 0)
                {                
                    if(current_degree < -90)
                    {
                        ShiftCircleBy90();
                        ShiftPositionBy90();
                        ShiftDegreeBy90();
                    }
                    if(current_degree > -90)
                    {
                        ShiftCircleBy90_1();
                        ShiftPositionBy90_1();
                        ShiftDegreeBy90_1();
                    }
                }
                applyCssEffect();
            }
        }
    );
});


function ShiftDegreeBy90_Anticlockwise()
{
    var end = pre_position_degree.length;
    var temp =  pre_position_degree[end-1];
    for(i=end-1 ; i>0 ; i--)
    {
        pre_position_degree[i] = pre_position_degree[i-1];
    }    
    pre_position_degree[0] = temp;
}

function ShiftCircleBy90_Anticlockwise()
{
    var end = position.length;
    for(i=end-1 ; i>0 ; i--)
    {
        rotateAnimation($circle[i],center[0],center[1],radiusOfCircle,pre_position_degree[i],pre_position_degree[i-1],-rotation,speed);
    }
    rotateAnimation($circle[0],center[0],center[1],radiusOfCircle,pre_position_degree[0],pre_position_degree[end-1],-rotation,speed);
}

function ShiftPositionBy90_Anticlockwise(){
    var end = position.length;
    var temp =  position[end-1];
    for(i=end-1 ; i>0 ; i--)
    {
        position[i] = position[i-1];
    }    
    position[0] = temp;
}


function ShiftDegreeBy90_Anticlockwise_1()
{
    ShiftDegreeBy90_Anticlockwise();
    ShiftDegreeBy90_Anticlockwise();
}

function ShiftCircleBy90_Anticlockwise_1()
{
    var end = position.length;
    for(i=end-1 ; i>1 ; i--)
    {
        rotateAnimation($circle[i],center[0],center[1],radiusOfCircle,pre_position_degree[i],pre_position_degree[i-2],-rotation,speed);
    }
    rotateAnimation($circle[0],center[0],center[1],radiusOfCircle,pre_position_degree[0],pre_position_degree[end-2],-rotation,speed);
    rotateAnimation($circle[1],center[0],center[1],radiusOfCircle,pre_position_degree[1],pre_position_degree[end-1],-rotation,speed);
}

function ShiftPositionBy90_Anticlockwise_1(){

    ShiftPositionBy90_Anticlockwise();
    ShiftPositionBy90_Anticlockwise();

}

function ShiftDegreeBy90()
{
    var temp =  pre_position_degree[0];
    var end = pre_position_degree.length;
    for(i=0 ; i<end-1 ; i++)
    {
        pre_position_degree[i] = pre_position_degree[i+1];
    }
    pre_position_degree[end-1] = temp;
}

function ShiftCircleBy90()
{
    var end = position.length;
    for(i=0 ; i<end-1 ; i++)
    {
        rotateAnimation($circle[i],center[0],center[1],radiusOfCircle,pre_position_degree[i],pre_position_degree[i+1],rotation,speed);
    }
    
    rotateAnimation($circle[end-1],center[0],center[1],radiusOfCircle,pre_position_degree[end-1],pre_position_degree[0],rotation,speed);            
}

function ShiftPositionBy90(){
    var temp =  position[0];
    var end = position.length;
    for(i=0 ; i<end-1 ; i++)
    {
        position[i] = position[i+1];
    }
    position[end-1] = temp;
}


function ShiftDegreeBy90_1()
{
    ShiftDegreeBy90();
    ShiftDegreeBy90();
}

function ShiftCircleBy90_1()
{
    var end = position.length;
    for(i=0 ; i<end-2 ; i++)
    {
        rotateAnimation($circle[i],center[0],center[1],radiusOfCircle,pre_position_degree[i],pre_position_degree[i+2],rotation,speed);
    }
    rotateAnimation($circle[end-1],center[0],center[1],radiusOfCircle,pre_position_degree[end-1],pre_position_degree[1],rotation,speed);
    rotateAnimation($circle[end-2],center[0],center[1],radiusOfCircle,pre_position_degree[end-2],pre_position_degree[0],rotation,speed);
            
}

function ShiftPositionBy90_1(){
    ShiftPositionBy90();
    ShiftPositionBy90();
}

function applyCssEffect()
{

    $circle[0].addClass("circleBeforeClick");
    $circle[1].addClass("circleBeforeClick");
    $circle[2].addClass("circleBeforeClick");                    
    $circle[3].addClass("circleBeforeClick");                    
    $circle[4].addClass("circleBeforeClick");   
    
    $circle[0].removeClass("circleAfterClick");
    $circle[1].removeClass("circleAfterClick");
    $circle[2].removeClass("circleAfterClick");                    
    $circle[3].removeClass("circleAfterClick");                    
    $circle[4].removeClass("circleAfterClick");   
    
    if(selectedCircle== 'circle_1')
    {
        $circle[0].removeClass("circleBeforeClick");
        $circle[0].addClass("circleAfterClick");
    }
    else
    if(selectedCircle== 'circle_2')
    {
        $circle[1].removeClass("circleBeforeClick");
        $circle[1].addClass("circleAfterClick");
    }
    else
    if(selectedCircle== 'circle_3')
    {
        $circle[2].removeClass("circleBeforeClick");
        $circle[2].addClass("circleAfterClick");
    }    
    else
    if(selectedCircle== 'circle_4')
    {
        $circle[3].removeClass("circleBeforeClick");
        $circle[3].addClass("circleAfterClick");
    }         
    else
    if(selectedCircle== 'circle_5')
    {
        $circle[4].removeClass("circleBeforeClick");
        $circle[4].addClass("circleAfterClick");
    }         
}

function rotateAnimation(src , center1 ,center2 , radius , start , end , direction, speed)
{
    src.stop()
            .animate({
                path : new $.path.arc({
                    center	: [center1,center2],
                    radius	: radius,
                    start	: start,
                    end		: end,
                    dir		: direction
                }),
                opacity: '1'
            },speed);        
}

function getPosition(circle)
{
    if(circle=='circle_1')
    {
        return position[0];
    }
    else
    if(circle=='circle_2')
    {
        return position[1];
    }
    else
    if(circle=='circle_3')
    {
        return position[2];    
    }
    else
    if(circle=='circle_4')
    {
        return position[3];    
    }    
    else
    if(circle=='circle_5')
    {
        return position[4];    
    }
}