import { Injectable, Inject } from '@nestjs/common';
import { IPost } from '../../types';

const POSTS: Record<string, IPost> = {
  'first-post': {
    title: 'First Post!',
    slug: 'first-post',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed suscipit quam, sit amet feugiat ligula. Nunc sit amet velit vestibulum, mattis orci gravida, aliquam velit. Donec eget lectus nec ipsum suscipit gravida et et odio. Morbi hendrerit dui scelerisque, imperdiet ligula in, ornare risus. Aliquam blandit sem risus, a ornare orci finibus ut. Maecenas interdum lacus arcu, nec finibus nibh semper quis. Vivamus venenatis pharetra ligula, eget semper justo finibus et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam finibus accumsan elit, et ornare nulla accumsan id. Cras nec leo sed ex egestas malesuada. Nullam a bibendum libero. Cras ullamcorper massa sed odio euismod vulputate. Nullam at ullamcorper dolor. Maecenas et fermentum arcu. Sed interdum nunc neque, eu consectetur ex commodo finibus. Nunc interdum aliquam purus, eu lobortis enim semper et.',
      'Ut sed dolor odio. Mauris cursus aliquet tortor, a posuere mi elementum in. Morbi sed efficitur mauris. Donec sed nulla efficitur, finibus massa ut, aliquet elit. Praesent eu mattis velit. Fusce sodales tincidunt mi, ut placerat turpis lobortis eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam at scelerisque lacus, ut commodo leo. Morbi vitae iaculis arcu. Donec finibus erat sed tristique feugiat. Morbi lorem tellus, elementum et facilisis eu, egestas fringilla eros. In quis arcu aliquam, ornare nulla malesuada, convallis massa. Donec tellus neque, tempor eu porttitor at, malesuada eget tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vel pellentesque elit. Morbi semper purus velit, a pulvinar eros blandit vel.',
    ],
  },
  'second-post': {
    title: 'Second Post!',
    slug: 'second-post',
    content: [
      'Nulla sed purus ullamcorper, volutpat leo ac, blandit sem. Aenean efficitur ante rhoncus, lobortis est nec, consequat nisl. Fusce quis semper ligula, eget commodo magna. In tincidunt nisl sed dui ornare, nec pulvinar nibh laoreet. Suspendisse lobortis elit at nunc egestas fermentum. Etiam leo dui, fermentum ac nulla et, hendrerit varius arcu. Quisque porttitor congue mattis. Mauris non lorem suscipit turpis dictum porttitor. Nullam eget blandit felis. Duis eu erat ac mauris egestas placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      'Etiam vel tellus sollicitudin, laoreet quam id, dignissim eros. Suspendisse dapibus tempor magna eget eleifend. Morbi molestie arcu id sagittis tristique. Suspendisse luctus id velit et elementum. Cras gravida sodales quam vel iaculis. Cras aliquet ex a placerat tincidunt. Fusce at ligula urna. Pellentesque id sapien lacus. Nullam eleifend ultrices tortor a hendrerit. Vivamus cursus leo eget tortor porttitor finibus. Quisque at quam gravida, aliquam orci ut, volutpat enim. Vivamus sit amet lobortis lacus. In aliquet consectetur diam vitae lacinia. Suspendisse ultrices malesuada turpis ac congue. Pellentesque vestibulum, nulla nec mollis euismod, sapien ipsum lobortis tortor, nec pellentesque sem nulla gravida diam.',
    ],
  },
};

export class BlogService {
  public all(): IPost[] {
    return Object.values(POSTS);
  }

  public find(slug: string): IPost | null {
    return POSTS[slug] || null;
  }
}
