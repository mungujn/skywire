import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../../services/node.service';
import {Node, NodeApp, NodeTransport} from '../../../app.datatypes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  node: Node;
  nodeApps: NodeApp[] = [];

  connectionsList: NodeTransport[] =
  [{
    from_node: '0383321972b09cae77dfab35e0947ad07721a3ce6173d7566a35057d0fc085b1b0',
    to_node: '0375967c2d171f7c71732b53085bd80720bb0e649eae1703c0d05337cd6faa3b9a',
    from_app: '0319ca3757706f1c86d0d3b2b9027de74aee9571b8b7ab2d555170f6ca0037333a',
    to_app: '03a75c3bc56b0329d77aed0347b2815f6e6a772ca0b30730cd51ed1b10793a8f57',
    upload_bandwidth: 1,
    download_bandwidth: 2,
    upload_total: 120,
    download_total: 1
  },
  {
    from_node: '0383321972b09cae77dfab35e0947ad07721a3ce6173d7566a35057d0fc085b1b0',
    to_node: '0375967c2d171f7c71732b53085bd80720bb0e649eae1703c0d05337cd6faa3b9a',
    from_app: '0319ca3757706f1c86d0d3b2b9027de74aee9571b8b7ab2d555170f6ca0037333a',
    to_app: '03a75c3bc56b0329d77aed0347b2815f6e6a772ca0b30730cd51ed1b10793a8f57',
    upload_bandwidth: 1,
    download_bandwidth: 2,
    upload_total: 120,
    download_total: 1
  }];

  appsList: NodeApp[] =
  [{
    key: '0383321972b09cae77dfab35e0947ad07721a3ce6173d7566a35057d0fc085b1b0',
    attributes: ['SSH', 'client'],
    allow_nodes: null
  },
  {
    key: '03a75c3bc56b0329d77aed0347b2815f6e6a772ca0b30730cd51ed1b10793a8f57',
    attributes: ['NODE', 'very long text 123213123123123', 'att3', 'att4'],
    allow_nodes: null
  },
  {
    key: '03a75c3bc56b0329d77aed0347b2815f6e6a772ca0b30730cd51ed1b10793a8f57',
    attributes: ['CLIENT'],
    allow_nodes: null
  }];

  constructor(
    private nodeService: NodeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const key = route.snapshot.params['key'];

    nodeService.node(key).subscribe(
      node => {
        this.node = { key, ...node };

        nodeService.nodeApps(this.node.addr).subscribe(apps => this.nodeApps = apps);
      },
      () => router.navigate(['nodes']),
    );
  }

  ngOnInit() {
  }

  back()
  {
    this.router.navigate(['nodes']);
  }
}
