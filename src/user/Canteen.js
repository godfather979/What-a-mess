import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Canteen = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Tables with people (Basic Boxes)
    for (let i = -4; i <= 4; i += 2) {
      const table = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.1, 2),
        new THREE.MeshStandardMaterial({ color: 0x8B4513 })
      );
      table.position.set(i, 0.55, -2);
      scene.add(table);

      // People (Spheres)
      const person = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xffccaa })
      );
      person.position.set(i, 1, -2);
      scene.add(person);
    }

    // Kitchen
    const kitchen = new THREE.Mesh(
      new THREE.BoxGeometry(5, 2, 2),
      new THREE.MeshStandardMaterial({ color: 0x555555 })
    );
    kitchen.position.set(-5, 1, 4);
    scene.add(kitchen);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, 10);
    controls.update();

    // Animation Loop
    let isMounted = true;
    function animate() {
      if (!isMounted) return;
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup function
    return () => {
      isMounted = false;
      controls.dispose();
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = ''; // Ensures it doesn't try to remove a null child
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }}></div>;  // Set full viewport height
};

export default Canteen;
