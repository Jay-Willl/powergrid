import {useRef, useEffect} from 'react';
import * as THREE from 'three';

function HeightMap({info}) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const arrLength = info.arrLength;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.set(20, 20, 20);
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);

        // Create cube given position and height
        const createCube = (x, y, height) => {
            const geometry = new THREE.BoxGeometry(1, height, 1);
            const material = new THREE.MeshLambertMaterial({color: 0x00ff00});
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, height / 2, y);
            return cube;
        };

        const cubeArr = info.resultArr.map((subArr, i) => {
            return subArr.map((item, j) => {
                const height = info.resultArr[i][j];
                const cube = createCube(i, j, height);
                scene.add(cube);
                return cube;
            })
        })

        // Animate
        const animate = () => {
            requestAnimationFrame(animate);
            cubeArr.forEach((subArr, i) => {
                subArr.forEach((cube, j) => {
                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;
                })
            })
            renderer.render(scene, camera);
        };

        animate();

        // Clean up
        return () => {
            mount.removeChild(renderer.domElement);
            renderer.dispose();
        };

    }, [info]);


    return (
        <div ref={mountRef} style={{width: '100%', height: '100%'}}>

        </div>
    )
}

export {HeightMap};
