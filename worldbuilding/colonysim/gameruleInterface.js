let gameruleInterFace = {
    peacetime: function(){
        return document.getElementById('peacetime_enabled').checked
    },
    alliances: function(){
        return document.getElementById('alliances_enabled').checked
    },
    technologySharing: function(){
        return document.getElementById('techsharing_enabled').checked
        
    }
};
export default gameruleInterFace;