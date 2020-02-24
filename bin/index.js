#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version('1.0.0')
    .description('模板copy cli')
program
    .command('* <tpl> <project>')
    .action(function(tpl, project) {
        log.info('目前jtemp-cli支持以下模板：')
        log.info('使用例子：jtemp-cli blinkJun/multiple-workspace（对应github项目） myproject（新工作目录名称）')
        if (tpl && project) {
            let pwd = shell.pwd()
            log.info(`正在从[https://github.com/${tpl}.git]拉取模板代码，下载位置：${pwd}/${project}/ ...`);
            clone(`https://github.com/${tpl}.git`, pwd + `/${project}`, {
                shallow:true
            }, function(err) {
                if(err){
                    log.info(err)
                }
                shell.rm('-rf', pwd + `/${project}/.git`)
                log.info('模板工程建立完成')
            })
        } else {
            log.error('正确命令例子：jtemp-cli blinkJun/multiple-workspace（对应github项目） myproject（新工作目录名称）')
        }
    })
program.parse(process.argv)