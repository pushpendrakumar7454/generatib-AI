import {ChatGroq} from '@langchain/groq'
import rl from 'node:readline/promises'
import {stdin,stdout} from 'node:process'
import {tool,createAgent} from 'langchain'
import * as z from 'zod'
import dotenv from 'dotenv'
dotenv.config()