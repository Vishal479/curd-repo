import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  

  page = 1;
  count = 0;
  tableSize = 7;
  responsive:boolean=true;
  posts: Post[] = [];
  tableSizes=this.posts.length;
  // searchText: any;
  

  constructor(public postService: PostService) { }
    
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;

      // this.posts=this.searchText;
    })  
  }
    
  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }

   onTableDataChange(event:any){
    this.page = event;
    this.fetchData();
  }  

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchData();
  }  



}
