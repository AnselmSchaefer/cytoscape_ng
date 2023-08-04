import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ParentService } from './parent.service';
import { GrandparentService } from './grandparent.service';
import * as cytoscape from 'cytoscape';
import qtip from "cytoscape-qtip";
(cytoscape as any).use(qtip);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cytoscape Demo';
  children: any;
  parents: any;
  foundindex = 0;

  dataLoading = false;

  constructor(private parentService: ParentService, private grandparentService: GrandparentService) { }

  ngOnInit(): void {
    /* NOT NEEDED FOR PURE FRONTEND TEST
    this.parentService.getAllChildren().subscribe(data => {
      this.children = data;
      this.grandparentService.getAllParents().subscribe(parentData => {
        this.parents = parentData;
        this.buildCytoscape();
      });
    });
    */
        this.buildCytoscape();

  }

  buildCytoscape(): void {
    const cytoscapeElements = [
      { data: { id: 'c178159', name: 'Paul', type: 'children' } },
      { data: { id: 'p35975', name: 'Timothy', type: 'parent' } },
      { data: { id: 'g35976', name: 'Greg', type: 'grandparent' } },
      { data: { id: 'r1_178159_35975', source: 'c178159', target: 'p35975' } },
      { data: { id: 'r2_35975_35976', source: 'p35975', target: 'g35976' } }
    ].flat(2);
    /* NOT NEEDED FOR PURE FRONTEND TEST
    const cytoscapeElements = this.children.map((child: any) => {
      const parent = this.children[0].parents[0]
      const grandParent = this.parents[1].grandparents[0]
      return [
        { data: { id: `c${child.id}`, name: child.name, type: 'children' } },
        { data: { id: `p${parent.id}`, name: parent.parent.name, type: 'parent' } },
        { data: { id: `g${grandParent.id}`, name: grandParent.grandParent.name, type: 'grandparent' } },
        { data: { id: `r1_${child.id}_${parent.id}`, source: `c${child.id}`, target: `p${parent.id}` } },
        { data: { id: `r2_${parent.id}_${grandParent.id}`, source: `p${parent.id}`, target: `g${grandParent.id}` } }
      ];
    }).flat(2);
    */

    const cy = (cytoscape as any)({
      container: document.getElementById('cy'),
      elements: cytoscapeElements,
      style: [
        {
          selector: 'node[type="children"]',
          style: {
            'background-color': 'red',
            'label': 'data(name)',
            'text-valign': 'center'
          }
        },
        {
          selector: 'node[type="parent"]',
          style: {
            'background-color': 'blue',
            'label': 'data(name)',
            'text-valign': 'center'
          }
        },
        {
          selector: 'node[type="grandparent"]',
          style: {
            'background-color': 'green',
            'label': 'data(name)',
            'text-valign': 'center'
          }
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'line-color': 'gray',
            'target-arrow-color': 'gray',
            'target-arrow-shape': 'triangle'
          }
        }
      ],
      layout: {
        name: 'circle'
      }
    });

    
    cy.on('tap', 'node', (evt:any)=> this.newData(evt))

    // Tooltip
    cy.nodes().each((node: any) => {
      node.qtip({
        content: "id:" + node.data("name") + " type:" + node.data("type"),

        show: {
          event: "mouseenter mouseover"
        },
        hide: {
          event: "mouseleave mouseout"
        }
      });
    });
  }

  
  //enable clicking (console output)
  async newData(evt:any){
      
    this.dataLoading = true
    let node = evt.target;
    console.log(node._private.data)
  
  }
}