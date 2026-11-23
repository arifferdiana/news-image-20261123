// news-image-20261123 entry (Node 22, standard library only).
// The image is entry.png beside this file; the program copies it byte-for-byte
// to /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB
// and 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = new URL('./entry.png', import.meta.url);
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);
// The gate refuses anything over 1 MiB, so fail loudly instead of shipping it.
if (statSync(dst).size > 1048576) throw new Error('entry.png exceeds the 1 MiB gate');
