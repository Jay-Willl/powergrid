import {useEffect, useRef} from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Box geometry
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        // Clean up on unmount
        return () => {
            mount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{width: '100%', height: '100vh'}}/>;
};

export {ThreeScene};
