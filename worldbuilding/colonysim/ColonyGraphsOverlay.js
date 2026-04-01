import Overlay from "./overlays/Overlay.js";

//TODO add reserve to active graph

export default class ColonyOverlay extends Overlay{
    constructor(overlay){
        super(overlay)
        this.addCloseAndBackButton();
        this.addGraphSelectionButtons();
        this.addEditorButttons()
        this.colonyOverlay;
        this.activeCharts = [];
        this.colony;
        this.cultureMatch;
        this.updateTicker = 0;
        this.updateTickerMax = 20;
    }


    setCultureMatch(cultMatch){
        this.cultureMatch = cultMatch;
    }

    setColony(colony){
        this.colony = colony;       
    }

    setColonyOverlay(colonyOverlay){
        this.colonyOverlay = colonyOverlay;
    }

    // Override
    hideOverlay(){
        this.overlay.style.display = "none";
        //destroy all created charts
        this.activeCharts.forEach((chart,i) => chart.destroy());
        this.activeCharts = [];
    }

    addCloseAndBackButton(){
        this.overlayButton = document.getElementById("colony_graphs_overlay_close_btn")

        this.overlayButton.onclick = () => {
            this.hideOverlay();
        }

        this.overlayButton = document.getElementById("colony_graphs_overlay_back_btn")
        this.overlayButton.onclick = () => {
            this.hideOverlay();
            this.colonyOverlay.showOverlay();
        }
    }
    
    clearActiveGraphArray(){
        this.activeCharts.forEach((chart,i) => chart.destroy());
        this.activeCharts = [];
    }


    addGraphSelectionButtons(){
        //Military Graph Overlay Buttons:
        document.getElementById("colony_overlay_military_graph_strength_btn").onclick = () => {
            this.clearActiveGraphArray();
            this.createMilitaryStrengthHistoryLineGraph(this.colony);
        }
        document.getElementById("colony_overlay_military_graph_troops_btn").onclick = () => {
            this.clearActiveGraphArray();
            this.createMilitaryTroopHistoryLineGraph(this.colony);
        }
        document.getElementById("colony_overlay_military_graph_ships_btn").onclick = () => {
            this.clearActiveGraphArray();
            this.createMilitaryShipHistoryLineGraph(this.colony);
        }
    }

    //Population Graph Overlay
    displayPopulationGraphOverlay(){
        this.hideAllGraphOverlays()
        this.showOverlay();
        document.getElementById("colony_overlay_graph_colony_name").innerHTML = this.colony.teamId;
        this.showElementWithId("population_graph_overlay")
        this.createPopulationHistoryLineGraph(this.colony);
        this.createPopulationCultureDoughnutGraph(this.colony);


    }

    


    createPopulationHistoryLineGraph(colony){

        let graphWidth =  document.getElementById("colony_graphs_overlay").offsetWidth;
        let graphHeight = graphWidth/300 * 200
        
        let popCanvas = document.getElementById("population_graph_canvas").getContext('2d')
        let num = colony.getSavedPopulationHistory().length;
        const popLabel = Array.from(Array(num),(x,i)=>i)

        Chart.defaults.color = "#ffffff";
        var newChart = new Chart(popCanvas, {
            type: 'line',
            data: {
                labels: popLabel,
                datasets:[{
                    label: "Population",
                    data:colony.getSavedPopulationHistory()
                }]
            },
            options:{
                plugins:{
                    title:{
                        display:true,
                        text: "Population Over Time"
                    }
                },
                elements:{
                    line: {
                        borderColor: '#ff6384'
                    }
                }
            }
        })
        this.activeCharts.push(newChart);
    }
    updatePopulationHistoryLineGraph(chart, colony){
        if (chart.canvas == null){
            chart.canvas = document.getElementById("population_graph_canvas").getContext('2d');
        }

        let num = colony.getSavedPopulationHistory().length;
        const popLabel = Array.from(Array(num),(x,i)=>i)

        chart.data.datasets.data = colony.getSavedPopulationHistory();
        chart.data.labels = popLabel;

        //this.debugPrintStaticChart(chart);

        // console.log(chart.options.plugins.title.text);
        chart.update('none');
 
    }


    createCultureColorList(labels){
        var colorLst = [];

        for (const colonyName of labels){
            if (!Object.values(this.cultureMatch).includes(colonyName)){
                colorLst.push(this.cultureMatch[colonyName]);
            }  else{
                colorLst.push("#3399ff");
            }  
        }
        return colorLst;
    }

    createPopulationCultureDoughnutGraph(colony){
    
        let popCanvas = document.getElementById("population_culture_graph_canvas").getContext('2d')

        var cultureDict = colony.getCultureNameDict();

        var cultureLabels = Object.keys(cultureDict);
        var cultureData = Object.values(cultureDict);
        var colorList = this.createCultureColorList(cultureLabels);

        // data
        var cultData = {
            labels: cultureLabels,
            datasets: [{
              label: 'Culture',
              data: cultureData,
              backgroundColor: colorList,
              hoverOffset: 0
            }]}


        //options
        var options = {
            plugins:{
                title:{
                    display:true,
                    text: "Population Culture"
                }
             
            },
            legend: {
            display: false
            }
        };


        // creating chart
        Chart.defaults.plugins.legend.display = false;
        
        Chart.defaults.color = "#ffffff";
        var newChart = new Chart(popCanvas, {
            type: 'doughnut',
            data: cultData,
            options: options
        })


        //this.debugPrintStaticChart(newChart);//DEBUG

        this.activeCharts.push(newChart);

    }


    updatePopulationCultureDoughnutGraph(chart, colony){

        if (chart.canvas == null){
            chart.canvas = document.getElementById("population_culture_graph_canvas").getContext('2d');
        }  
  
        var cultureDict = colony.getCultureNameDict();
        var cultureLabels = Object.keys(cultureDict);
        var cultureData = Object.values(cultureDict);
        var colorList = this.createCultureColorList(cultureLabels);

        chart.data.datasets[0].data = cultureData// call index 0 before of way it was create
        chart.data.labels = cultureLabels
        chart.data.datasets.backgroundColor = colorList



        chart.update('none');
    }



    //Military Graph Overlay
    displayMilitaryGraphOverlay(){
        this.hideAllGraphOverlays()
        this.showOverlay();
        document.getElementById("colony_overlay_graph_colony_name").innerHTML = this.colony.teamId;
        this.showElementWithId("military_graph_overlay")
        this.createMilitaryStrengthHistoryLineGraph(this.colony);
    }

    createMilitaryStrengthHistoryLineGraph(colony){
        let graphWidth =  document.getElementById("colony_graphs_overlay").offsetWidth;
        let graphHeight = graphWidth/300 * 200
        
        let milCanvas = document.getElementById("military_graph_canvas").getContext('2d')
        let num = colony.getSavedMilStrengthHistory().length;
        const milLabel = Array.from(Array(num),(x,i)=>i)

        Chart.defaults.color = "#ffffff";
        var newChart = new Chart(milCanvas, {
            type: 'line',
            data: {
                labels: milLabel,
                datasets:[{
                    label: "Strength",
                    data:colony.getSavedMilStrengthHistory()
                }]
            },
            options:{
                plugins:{
                    title:{
                        display:true,
                        text: "Military Strength Over Time"
                    }
                },
                elements:{
                    line: {
                        borderColor: '#ff6384'
                    }
                }
            }
        })
        this.activeCharts.push(newChart);
    }

    updateMilitaryStrengthHistoryLineGraph(chart, colony){
        if (chart.canvas == null){
            chart.canvas = document.getElementById("military_graph_canvas").getContext('2d');
        }
        chart.data.datasets.data = colony.getSavedMilStrengthHistory();

        let num = colony.getSavedMilStrengthHistory().length;
        const milLabel = Array.from(Array(num),(x,i)=>i)
        chart.data.labels = milLabel;

        chart.update('none');
    }

    createMilitaryTroopHistoryLineGraph(colony){
        let graphWidth =  document.getElementById("colony_graphs_overlay").offsetWidth;
        let graphHeight = graphWidth/300 * 200
        
        let milCanvas = document.getElementById("military_graph_canvas").getContext('2d')
        let num = colony.getSavedActiveTroopsHistory().length;
        const milLabel = Array.from(Array(num),(x,i)=>i)

        Chart.defaults.color = "#ffffff";
        var newChart = new Chart(milCanvas, {
            type: 'line',
            data: {
                labels: milLabel,
                datasets:[{
                    label: "Troops",
                    data:colony.getSavedActiveTroopsHistory()
                }]
            },
            options:{
                plugins:{
                    title:{
                        display:true,
                        text: "Active Troops Over Time"
                    }
                },
                elements:{
                    line: {
                        borderColor: '#ff6384'
                    }
                }
            }
        })
        this.activeCharts.push(newChart);
    }
    updateActiveTroopsHistoryLineGraph(chart, colony){
        if (chart.canvas == null){
            chart.canvas = document.getElementById("military_graph_canvas").getContext('2d');
        }
        chart.data.datasets.data = colony.getSavedActiveTroopsHistory();

        let num = colony.getSavedActiveTroopsHistory().length;
        const milLabel = Array.from(Array(num),(x,i)=>i)
        chart.data.labels = milLabel;

        chart.update('none');
    }


    

    createMilitaryShipHistoryLineGraph(colony){
        let graphWidth =  document.getElementById("colony_graphs_overlay").offsetWidth;
        let graphHeight = graphWidth/300 * 200
        
        let milCanvas = document.getElementById("military_graph_canvas").getContext('2d')
        let num = colony.getSavedActiveTroopsHistory().length;
        const milLabel = Array.from(Array(num),(x,i)=>i)

        Chart.defaults.color = "#ffffff";
        var newChart = new Chart(milCanvas, {
            type: 'line',
            data: {
                labels: milLabel,
                datasets:[{
                    label: "Ships",
                    data:colony.getSavedActiveShipsHistory()
                }]
            },
            options:{
                plugins:{
                    title:{
                        display:true,
                        text: "Active Ships Over Time"
                    }
                },
                elements:{
                    line: {
                        borderColor: '#ff6384'
                    }
                }
            }
        })
        this.activeCharts.push(newChart);
    }


    updateActiveShipsHistoryLineGraph(chart, colony){
        if (chart.canvas == null){
            chart.canvas = document.getElementById("military_graph_canvas").getContext('2d');
        }
        chart.data.datasets.data = colony.getSavedActiveShipsHistory();

        let num = colony.getSavedActiveShipsHistory().length;
        const milLabel = Array.from(Array(num),(x,i)=>i)
        chart.data.labels = milLabel;

        chart.update('none');
    }


    hideAllGraphOverlays(){
        this.hideElementWithId("population_graph_overlay")
        this.hideElementWithId("military_graph_overlay")
    }

    hideElementWithId(id){
        document.getElementById(id).style.display = "none";
    }
    showElementWithId(id){
        document.getElementById(id).style.display = "block";
    }


    updateChartGivenTitle(titleID, chart){
        switch(titleID){
            case "Population Over Time":
                this.updatePopulationHistoryLineGraph(chart, this.colony);
            case "Military Strength Over Time":
                this.updateMilitaryStrengthHistoryLineGraph(chart, this.colony);
            case "Active Troops Over Time":
                this.updateActiveTroopsHistoryLineGraph(chart, this.colony);
            case "Active Ships Over Time" :
                 this.updateActiveShipsHistoryLineGraph(chart, this.colony);
            }

            //doesnt work in switch
            if (titleID === "Population Culture"){
                this.updatePopulationCultureDoughnutGraph(chart, this.colony);
            }
    }


    updateActiveCharts(){
        if (this.updateTicker >= this.updateTickerMax){

            for(const chart of this.activeCharts){
                this.updateChartGivenTitle(chart.options.plugins.title.text, chart)
            }  
            this.updateTicker = 0;
        }else{
            this.updateTicker++;
        }
    }



    debugPrintStaticChart(chart){
        console.log(`**** ${chart.options.plugins.title.text} ****`)
        console.log(`    data = ${chart.data.datasets.data}`)
        console.log(`    labels = ${chart.data.labels}`)
        console.log(chart.canvas);
    }




    /**
     * 
     * EDITOR 
     * 
     */

    addEditorButttons(){
        document.getElementById("colony_overlay_edit_strength_count_btn").onclick = () => {
            this.colony.changeMilStrengthAmount(parseInt(document.getElementById("colony_overlay_edit_milstrength_count_input").value));
        }

        document.getElementById("colony_overlay_edit_troop_count_btn").onclick = () => {
            this.colony.changeReserveTroopsAmount(parseInt(document.getElementById("colony_overlay_edit_troop_count_input").value));
        }

        document.getElementById("colony_overlay_edit_ship_count_btn").onclick = () => {
            this.colony.addShipsByAmount(parseInt(document.getElementById("colony_overlay_edit_ship_count_input").value));
        }
    }
    
}